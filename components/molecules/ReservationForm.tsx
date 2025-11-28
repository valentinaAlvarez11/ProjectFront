// components/molecules/ReservationForm
"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  createReservationSchema, 
  updateReservationSchema,
  CreateReservationFormData,
  UpdateReservationFormData 
} from '@/schemas/reservation';
import { IReservationAdmin, IReservationUpdatePayload } from '@/interfaces/reservations';
import { IRoom } from '@/interfaces/rooms';
import { IUser } from '@/interfaces/users';
import FormInput from '@/components/atoms/FormInput';
import FormSelect from '@/components/atoms/FormSelect';
import FormButton from '@/components/atoms/FormButton';
import RoomsService from '@/libs/rooms.service';
import UsersService from '@/libs/users.service';
import ReservationsService from '@/libs/reservations.service'; // \uD83D\uDD0C Importado el servicio de reservas
import { useAuthStore } from '@/store/authStore';
import { formComponents, adminPage } from '@/utils/Tokens';
import { FaUser, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';


const getDatesInRange = (startDateString: string, endDateString: string): string[] => {
    const dates: string[] = [];
    let currentDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    // Asegurarse de que el inicio es medianoche UTC para evitar problemas de zona horaria
    currentDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(0, 0, 0, 0);

    // Iterar D\u00cdA por D\u00cdA, deteni\u00e9ndose ANTES del d\u00eda de salida (checkout)
    while (currentDate.getTime() < endDate.getTime()) {
        // Formato YYYY-MM-DD
        dates.push(currentDate.toISOString().split('T')[0]);
        // Avanzar al d\u00eda siguiente
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
    return dates;
};

interface ReservationFormProps {
  onSubmit: (data: CreateReservationFormData | UpdateReservationFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: IReservationAdmin;
  isEditing?: boolean;
  isLoading?: boolean;
  isAdmin?: boolean;
}

export default function ReservationForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
  isLoading = false,
  isAdmin = false,
}: ReservationFormProps) {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { user: currentUser } = useAuthStore();
    
  // ⬇️ NUEVOS ESTADOS para el control de fechas
  const [occupiedDates, setOccupiedDates] = useState<string[]>([]);
  const [loadingOccupiedDates, setLoadingOccupiedDates] = useState(false);

  const schema = isEditing ? updateReservationSchema : createReservationSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateReservationFormData | UpdateReservationFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData ? {
      habitacionId: initialData.habitacionId,
      fecha_inicio: initialData.fecha_inicio.split('T')[0], // Convertir a formato date
      fecha_fin: initialData.fecha_fin.split('T')[0],
      ...(isEditing && { estado: initialData.estado }),
    } : {
      habitacionId: 0,
      fecha_inicio: '',
      fecha_fin: '',
      usuarioId: undefined,
      ...(isEditing && { estado: 'pendiente' as const }),
    },
  });
    
  // Obtener los valores observados (watch)
  const fechaInicioWatch = watch('fecha_inicio');
  const fechaFinWatch = watch('fecha_fin');
  const habitacionIdWatch = watch('habitacionId'); // Observamos la habitaci\u00f3n


  // ----------------------------------------------------
  // \uD83D\uDD0C L\u00d3GICA DE CARGA Y C\u00c1LCULO DE FECHAS OCUPADAS
  // ----------------------------------------------------
  useEffect(() => {
    const roomSelected = Number(habitacionIdWatch);
    const currentReservationId = initialData?.id; // ID de la reserva si estamos editando

    if (roomSelected > 0) {
      const loadAndCalculateOccupiedDates = async () => {
        try {
          setLoadingOccupiedDates(true);
          setServerError(null);
          
          // 1. Obtener todas las reservas de la habitaci\u00f3n
          const response = await ReservationsService.getByRoomAdmin(roomSelected);
          const allReservations: IReservationAdmin[] = response.reservas || [];
          
          const occupied: string[] = [];
          
          // 2. Procesar las reservas para obtener todas las fechas ocupadas
          allReservations.forEach(reservation => {
            // EXCLUIR la propia reserva en caso de edici\u00f3n (para permitir moverla)
            if (isEditing && currentReservationId === reservation.id) {
              return; 
            }
            
            // Solo considerar reservas activas
            if (reservation.estado === 'confirmada' || reservation.estado === 'pendiente') {
                
                // Obtener solo la parte YYYY-MM-DD
                const startDate = reservation.fecha_inicio.split('T')[0];
                const endDate = reservation.fecha_fin.split('T')[0];
                
                // Obtener el rango de fechas ocupadas (excluyendo el d\u00eda de salida)
                const dates = getDatesInRange(startDate, endDate);
                occupied.push(...dates);
            }
          });

          // Eliminar duplicados y ordenar
          setOccupiedDates(Array.from(new Set(occupied)).sort());

        } catch (error: any) {
          console.error('Error al cargar y calcular fechas ocupadas:', error);
          setServerError('Error al cargar la disponibilidad de fechas.');
          setOccupiedDates([]);
        } finally {
          setLoadingOccupiedDates(false);
        }
      };

      loadAndCalculateOccupiedDates();
    } else {
      setOccupiedDates([]); // Si no hay habitaci\u00f3n, no hay fechas ocupadas
    }
  }, [habitacionIdWatch, isEditing, initialData?.id]); 

  // Determinar si los campos de fecha est\u00e1n deshabilitados (Requisito 1 y 2)
  const isDateFieldsDisabled = !isEditing && Number(habitacionIdWatch) <= 0;

  // Funci\u00f3n para verificar si una fecha est\u00e1 ocupada
  const isDateOccupied = (dateString: string) => {
    return occupiedDates.includes(dateString);
  };
  // ----------------------------------------------------


  // Cargar habitaciones
  useEffect(() => { /* ... (L\u00f3gica existente) */ }, []);

  // Cargar usuarios
  useEffect(() => { /* ... (L\u00f3gica existente) */ }, [isAdmin, isEditing, currentUser]);


  // Obtener fecha m\u00ednima (hoy)
  const getMinDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split('T')[0];
  };

  // Obtener fecha m\u00ednima para fecha_fin (fecha_inicio + 1 d\u00eda)
  const getMinEndDate = () => {
    if (!fechaInicioWatch) return getMinDate();
    const inicio = new Date(fechaInicioWatch);
    inicio.setDate(inicio.getDate() + 1);
    return inicio.toISOString().split('T')[0];
  };

  const handleFormSubmit = async (data: any) => {
    try {
      setServerError(null);

      // 1. Validaci\u00f3n de fechas ocupadas (\uD83D\uDD12 Bloqueo de d\u00edas ocupados)
      const startDate = new Date(data.fecha_inicio);
      const endDate = new Date(data.fecha_fin);
      
      // Recorrer el rango de reserva elegido
      let currentDate = new Date(startDate);
      currentDate.setUTCHours(0, 0, 0, 0); 

      // Iterar D\u00cdA por D\u00cdA, deteni\u00e9ndose ANTES del d\u00eda de salida
      while (currentDate.getTime() < endDate.getTime()) {
          const dateString = currentDate.toISOString().split('T')[0];
          
          if (isDateOccupied(dateString)) {
              setServerError(`La habitaci\u00f3n ya est\u00e1 ocupada el d\u00eda ${dateString}. Por favor, elija un rango diferente.`);
              return; // Detener el submit
          }
          currentDate.setUTCDate(currentDate.getUTCDate() + 1); // Avanzar un d\u00eda
      }
      
      // 2. Validar que si es admin creando, debe tener usuarioId
      if (isAdmin && !isEditing && !data.usuarioId) {
        setServerError('Debe seleccionar un usuario para crear la reserva');
        return;
      }
      
      // 3. Env\u00edo
      const formData = {
        ...data,
        habitacionId: Number(data.habitacionId),
        ...(isAdmin && !isEditing && data.usuarioId && { usuarioId: Number(data.usuarioId) }),
      };
      await onSubmit(formData);
    } catch (error: any) {
      console.error('Error al enviar formulario:', error);
      setServerError(error?.message || 'Error al procesar la reserva');
    }
  };

  // Calcular n\u00famero de noches y precios
  const nights = calculateNights();
  const selectedRoom = rooms.find(r => r.id === Number(habitacionIdWatch));
  // ... (resto de la l\u00f3gica de c\u00e1lculo)
  const precioPorNoche = selectedRoom?.precio_noche || 0;
  const subtotal = precioPorNoche * nights;
  const total = subtotal; 
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-6">
      {serverError}

      {/* Informaci\u00f3n del Usuario (solo para admin al crear) */}
      {isAdmin && !isEditing && ( /* ... */ )}

      {/* Informaci\u00f3n de la Reserva */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#0a174e] border-b-2 border-[#b6a253] pb-2">
          Informaci\u00f3n de la Reserva
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <FormSelect
            label="Habitaci\u00f3n"
            name="habitacionId"
            register={register}
            error={errors.habitacionId}
            options={roomOptions}
            required
            placeholder="Seleccione una habitaci\u00f3n"
            defaultValue={initialData?.habitacionId.toString()}
          />

          {isEditing}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Campo Fecha de Inicio */}
          <div className="flex flex-col space-y-2">
            <label 
              htmlFor="fecha_inicio" 
              className={formComponents.label}
            >
              Fecha de Inicio <span className="text-red-500">*</span>
            </label>
            <input
              {...register('fecha_inicio')}
              type="date"
              id="fecha_inicio"
              min={getMinDate()}
              // \uD83D\uDD12 Bloqueo condicional si no hay habitaci\u00f3n seleccionada
              disabled={isDateFieldsDisabled || loadingOccupiedDates || isLoading}
              className={`${formComponents.inputBase} ${
                errors.fecha_inicio 
                  ? formComponents.inputError
                  : formComponents.inputNormal
              } ${isDateFieldsDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            {errors.fecha_inicio && (
              <p className={formComponents.errorText}>
                {errors.fecha_inicio.message}
              </p>
            )}
          </div>

          {/* Campo Fecha de Fin */}
          <div className="flex flex-col space-y-2">
            <label 
              htmlFor="fecha_fin" 
              className={formComponents.label}
            >
              Fecha de Fin <span className="text-red-500">*</span>
            </label>
            <input
              {...register('fecha_fin')}
              type="date"
              id="fecha_fin"
              min={getMinEndDate()}
              // \uD83D\uDD12 Bloqueo condicional si no hay habitaci\u00f3n seleccionada
              disabled={isDateFieldsDisabled || loadingOccupiedDates || isLoading}
              className={`${formComponents.inputBase} ${
                errors.fecha_fin 
                  ? formComponents.inputError
                  : formComponents.inputNormal
              } ${isDateFieldsDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            {errors.fecha_fin && (
              <p className={formComponents.errorText}>
                {errors.fecha_fin.message}
              </p>
            )}
          </div>
        </div>
        
        {/* Indicador de carga de disponibilidad */}
        {loadingOccupiedDates && !isDateFieldsDisabled && (
            <div className="text-center py-2">
                <p className="text-sm text-[#0a174e] font-semibold">
                    Cargando disponibilidad de fechas...
                </p>
            </div>
        )}

        {/* Resumen de Precios - Mostrar siempre que haya habitaci\u00f3n y fechas */}
        {selectedRoom && fechaInicioWatch && fechaFinWatch && nights > 0}
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <FormButton
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={isLoading || loadingRooms || loadingOccupiedDates}
        >
          {isLoading ? 'Guardando...' : isEditing ? 'Actualizar Reserva' : 'Crear Reserva'}
        </FormButton>
        <FormButton
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
          disabled={isLoading || loadingOccupiedDates}
        >
          Cancelar
        </FormButton>
      </div>
    </form>
  );
}