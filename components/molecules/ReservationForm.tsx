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
import { IReservation, IReservationAdmin, IReservationUpdatePayload } from '@/interfaces/reservations';
import { IRoom } from '@/interfaces/rooms';
import { IUser } from '@/interfaces/users';
import FormInput from '@/components/atoms/FormInput';
import FormSelect from '@/components/atoms/FormSelect';
import FormDateInput from '@/components/atoms/FormDateInput';
import FormButton from '@/components/atoms/FormButton';
import ErrorAlert from '@/components/molecules/ErrorAlert';
import RoomsService from '@/libs/rooms.service';
import UsersService from '@/libs/users.service';
import ReservationsService from '@/libs/reservations.service';
import { useAuthStore } from '@/store/authStore';
import { formComponents, adminPage, colors, spacing, typography } from '@/utils/Tokens';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaBed, FaDollarSign, FaMoon, FaHotel } from 'react-icons/fa';
import FormSection from '@/components/molecules/FormSection';
import PriceSummary from '@/components/molecules/PriceSummary';
import LoadingIndicator from '@/components/atoms/LoadingIndicator';
import AlertBanner from '@/components/atoms/AlertBanner';


const getDatesInRange = (startDateString: string, endDateString: string): string[] => {
    const dates: string[] = [];
    
    // Trabajar con strings YYYY-MM-DD directamente para evitar problemas de zona horaria
    const [startYear, startMonth, startDay] = startDateString.split('-').map(Number);
    const [endYear, endMonth, endDay] = endDateString.split('-').map(Number);
    
    let currentYear = startYear;
    let currentMonth = startMonth;
    let currentDay = startDay;
    
    // Iterar D\u00cdA por D\u00cdA, deteni\u00e9ndose ANTES del d\u00eda de salida (checkout)
    while (
        currentYear < endYear ||
        (currentYear === endYear && currentMonth < endMonth) ||
        (currentYear === endYear && currentMonth === endMonth && currentDay < endDay)
    ) {
        const dateString = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;
        dates.push(dateString);
        
        // Avanzar al d\u00eda siguiente
        currentDay++;
        if (currentDay > new Date(currentYear, currentMonth, 0).getDate()) {
            currentDay = 1;
            currentMonth++;
            if (currentMonth > 12) {
                currentMonth = 1;
                currentYear++;
            }
        }
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
    resolver: zodResolver(schema) as any,
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
  const habitacionIdWatch = watch('habitacionId'); // Observamos la Habitación


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
          
          // 1. Obtener todas las reservas de la Habitación usando el endpoint público
          const response = await ReservationsService.checkAvailability(roomSelected);
          const allReservations: IReservation[] = response.reservas || [];
          
          const occupied: string[] = [];
          
          // 2. Procesar las reservas para obtener todas las fechas ocupadas
          allReservations.forEach(reservation => {
            // EXCLUIR la propia reserva en caso de edici\u00f3n (para permitir moverla)
            if (isEditing && currentReservationId === reservation.id) {
              return; 
            }
            
            // Solo considerar reservas activas (ya vienen filtradas del endpoint)
            // Obtener solo la parte YYYY-MM-DD
            const startDate = reservation.fecha_inicio.split('T')[0];
            const endDate = reservation.fecha_fin.split('T')[0];
            
            // Obtener el rango de fechas ocupadas (excluyendo el d\u00eda de salida)
            const dates = getDatesInRange(startDate, endDate);
            occupied.push(...dates);
          });

          // Eliminar duplicados y ordenar
          setOccupiedDates(Array.from(new Set(occupied)).sort());

        } catch (error: any) {
          console.error('Error al cargar y calcular fechas ocupadas:', error);
          // No mostrar error al usuario si es solo para calcular fechas ocupadas
          // Solo loguear el error
          setOccupiedDates([]);
        } finally {
          setLoadingOccupiedDates(false);
        }
      };

      loadAndCalculateOccupiedDates();
    } else {
      setOccupiedDates([]); // Si no hay Habitación, no hay fechas ocupadas
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
  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoadingRooms(true);
        setServerError(null);
        const response = await RoomsService.getAllPublic(true); // Solo habitaciones disponibles
        setRooms(response.habitaciones);
      } catch (err: any) {
        console.error('Error al cargar habitaciones:', err);
        setServerError(err?.message || 'Error al cargar las habitaciones');
      } finally {
        setLoadingRooms(false);
      }
    };
    loadRooms();
  }, []);

  // Cargar usuarios (para admin y recepcionista al crear)
  useEffect(() => {
    if (isAdmin && !isEditing) {
      const loadUsers = async () => {
        try {
          setLoadingUsers(true);
          const response = await UsersService.getAllUsersAdmin();
          // Filtrar solo clientes
          const clientes = response.usuarios.filter(user => user.rol === 'cliente');
          setUsers(clientes);
        } catch (err: any) {
          console.error('Error al cargar usuarios:', err);
          setServerError(err?.message || 'Error al cargar los usuarios');
        } finally {
          setLoadingUsers(false);
        }
      };
      loadUsers();
    }
  }, [isAdmin, isEditing, currentUser]);


  // Obtener fecha m\u00ednima (hoy)
  const getMinDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split('T')[0];
  };

  // Obtener fecha m\u00ednima para fecha_fin (fecha_inicio + 1 d\u00eda)
  const getMinEndDate = () => {
    if (!fechaInicioWatch) return getMinDate();
    // Trabajar con strings YYYY-MM-DD directamente para evitar problemas de zona horaria
    const [year, month, day] = fechaInicioWatch.split('-').map(Number);
    const date = new Date(year, month - 1, day + 1); // month - 1 porque Date usa 0-indexed months
    const nextYear = date.getFullYear();
    const nextMonth = String(date.getMonth() + 1).padStart(2, '0');
    const nextDay = String(date.getDate()).padStart(2, '0');
    return `${nextYear}-${nextMonth}-${nextDay}`;
  };

  const handleFormSubmit = async (data: any) => {
    try {
      setServerError(null);

      // 1. Validaci\u00f3n de fechas ocupadas (\uD83D\uDD12 Bloqueo de d\u00edas ocupados)
      // Asegurarse de que las fechas se trabajen como strings YYYY-MM-DD sin conversión de zona horaria
      const startDateString = data.fecha_inicio; // Ya viene en formato YYYY-MM-DD
      const endDateString = data.fecha_fin; // Ya viene en formato YYYY-MM-DD
      
      // Validar que las fechas sean válidas
      if (!startDateString || !endDateString) {
        setServerError('Las fechas son requeridas');
        return;
      }

      // Recorrer el rango de reserva elegido usando strings directamente
      const [startYear, startMonth, startDay] = startDateString.split('-').map(Number);
      const [endYear, endMonth, endDay] = endDateString.split('-').map(Number);
      
      let currentYear = startYear;
      let currentMonth = startMonth;
      let currentDay = startDay;
      
      // Iterar D\u00cdA por D\u00cdA, deteni\u00e9ndose ANTES del d\u00eda de salida
      while (
        currentYear < endYear ||
        (currentYear === endYear && currentMonth < endMonth) ||
        (currentYear === endYear && currentMonth === endMonth && currentDay < endDay)
      ) {
        const dateString = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;
        
        if (isDateOccupied(dateString)) {
            setServerError(`La Habitación ya est\u00e1 ocupada el d\u00eda ${dateString}. Por favor, elija un rango diferente.`);
            return; // Detener el submit
        }
        
        // Avanzar un d\u00eda
        currentDay++;
        if (currentDay > new Date(currentYear, currentMonth, 0).getDate()) {
          currentDay = 1;
          currentMonth++;
          if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++;
          }
        }
      }
      
      // 2. Validar que si es admin o recepcionista creando, debe tener usuarioId
      if (isAdmin && !isEditing && !data.usuarioId) {
        setServerError('Debe seleccionar un usuario para crear la reserva');
        return;
      }
      
      // 3. Env\u00edo - Asegurarse de enviar las fechas como strings YYYY-MM-DD
      const formData = {
        ...data,
        habitacionId: Number(data.habitacionId),
        fecha_inicio: startDateString, // Asegurar formato YYYY-MM-DD
        fecha_fin: endDateString, // Asegurar formato YYYY-MM-DD
        ...(isAdmin && !isEditing && data.usuarioId && { usuarioId: Number(data.usuarioId) }),
      };
      
      // Debug: Ver qué se está enviando desde el formulario
      console.log('📋 Datos del formulario antes de enviar:', {
        data_original: data,
        formData_final: formData,
        startDateString,
        endDateString
      });
      
      await onSubmit(formData);
    } catch (error: any) {
      console.error('Error al enviar formulario:', error);
      setServerError(error?.message || 'Error al procesar la reserva');
    }
  };

  // Calcular n\u00famero de noches
  const calculateNights = (): number => {
    if (!fechaInicioWatch || !fechaFinWatch) return 0;
    // Trabajar con strings YYYY-MM-DD directamente para evitar problemas de zona horaria
    const inicioUTC = new Date(fechaInicioWatch + 'T00:00:00.000Z');
    const finUTC = new Date(fechaFinWatch + 'T00:00:00.000Z');
    const diffTime = Math.abs(finUTC.getTime() - inicioUTC.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calcular n\u00famero de noches y precios
  const nights = calculateNights();
  const selectedRoom = rooms.find(r => r.id === Number(habitacionIdWatch));
  const precioPorNoche = selectedRoom?.precio_noche || 0;
  const subtotal = precioPorNoche * nights;
  const total = subtotal;

  // Opciones para el select de habitaciones
  const roomOptions = rooms.length > 0 ? rooms.map(room => ({
    value: room.id.toString(),
    label: `Habitación ${room.numero} (${room.tipo}) - $${room.precio_noche.toLocaleString()} por noche`
  })) : [];

  // Opciones para el select de usuarios (solo para admin)
  const userOptions = users.map(user => ({
    value: user.id.toString(),
    label: `${user.nombre} (${user.email})`
  })); 
  return (
    <div className="w-full max-w-full mx-auto px-2 sm:px-4">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 sm:space-y-8">
      {/* Mensaje de error del servidor */}
      {serverError && (
        <AlertBanner
          type="error"
          message={serverError}
          onClose={() => setServerError(null)}
        />
      )}

      {/* Información del Usuario (para admin y recepcionista al crear) */}
      {isAdmin && !isEditing && (
        <FormSection
          icon={FaUser}
          title="Información del Usuario"
          subtitle="Seleccione el cliente para la reserva"
          variant="gradient"
        >
          <FormSelect
            label="Usuario"
            name="usuarioId"
            register={register}
            error={(errors as any).usuarioId}
            options={userOptions}
            required
            placeholder="Seleccione un usuario"
            disabled={loadingUsers}
          />
        </FormSection>
      )}

      {/* Información de la Reserva */}
      <FormSection
        icon={FaBed}
        title="Información de la Reserva"
        subtitle="Complete los datos de su reserva"
        variant="gradient"
      >
        {/* Sección de Habitación y Estado */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 sm:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#0a174e]/10 flex items-center justify-center">
              <FaHotel className="text-[#0a174e] text-lg" />
            </div>
            <h3 className={`${typography.cardTitle} text-[#0a174e] text-lg`}>
              Detalles de la Habitación
            </h3>
          </div>
          <div className={`grid grid-cols-1 ${isEditing ? 'md:grid-cols-2' : 'md:grid-cols-1'} ${spacing.gap.medium}`}>
            <FormSelect
              label="Habitación"
              name="habitacionId"
              register={register}
              error={errors.habitacionId}
              options={roomOptions}
              required
              placeholder={loadingRooms ? "Cargando habitaciones..." : "Seleccione una Habitación"}
              defaultValue={initialData?.habitacionId.toString()}
              disabled={loadingRooms}
            />

            {isEditing && (
              <FormSelect
                label="Estado de la Reserva"
                name="estado"
                register={register}
                error={(errors as any).estado}
                options={[
                  { value: 'pendiente', label: '⏳ Pendiente' },
                  { value: 'confirmada', label: '✅ Confirmada' },
                  { value: 'cancelada', label: '❌ Cancelada' }
                ]}
                required
                placeholder="Seleccione un estado"
                defaultValue={initialData?.estado || 'pendiente'}
              />
            )}
          </div>
          {loadingRooms && (
            <AlertBanner
              type="info"
              message="Cargando habitaciones disponibles..."
              icon={
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
              }
              className="mt-4"
            />
          )}
          {!loadingRooms && roomOptions.length === 0 && (
            <AlertBanner
              type="warning"
              message="No hay habitaciones disponibles en este momento"
              className="mt-4"
            />
          )}
        </div>

        {/* Sección de Fechas */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 sm:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#0a174e]/10 flex items-center justify-center">
              <FaCalendarAlt className="text-[#0a174e] text-lg" />
            </div>
            <h3 className={`${typography.cardTitle} text-[#0a174e] text-lg`}>
              Fechas de Reserva
            </h3>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 ${spacing.gap.medium}`}>
            <FormDateInput
              label="Fecha de Inicio"
              name="fecha_inicio"
              register={register}
              error={errors.fecha_inicio}
              required
              min={getMinDate()}
              disabled={isDateFieldsDisabled || loadingOccupiedDates || isLoading}
            />

            <FormDateInput
              label="Fecha de Fin"
              name="fecha_fin"
              register={register}
              error={errors.fecha_fin}
              required
              min={getMinEndDate()}
              disabled={isDateFieldsDisabled || loadingOccupiedDates || isLoading}
            />
          </div>
          {isDateFieldsDisabled && (
            <AlertBanner
              type="warning"
              message="Por favor, seleccione una habitación primero para habilitar las fechas"
              className="mt-4"
            />
          )}
        </div>
        
        {/* Indicador de carga de disponibilidad */}
        {loadingOccupiedDates && !isDateFieldsDisabled && (
          <LoadingIndicator message="Verificando disponibilidad de fechas..." />
        )}

        {/* Resumen de Precios - Mostrar siempre que haya Habitación y fechas */}
        {selectedRoom && fechaInicioWatch && fechaFinWatch && nights > 0 && (
          <PriceSummary
            pricePerNight={precioPorNoche}
            nights={nights}
            total={total}
          />
        )}
      </FormSection>

      {/* Botones de Acción */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <FormButton
            type="submit"
            variant="primary"
            className="flex-1 order-2 sm:order-1"
            disabled={isLoading || loadingRooms || loadingOccupiedDates}
            fullWidth={true}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Guardando...
              </span>
            ) : isEditing ? (
              <span className="flex items-center justify-center gap-2">
                <FaCalendarAlt />
                Actualizar Reserva
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <FaCalendarAlt />
                Crear Reserva
              </span>
            )}
          </FormButton>
          <FormButton
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="flex-1 order-1 sm:order-2"
            disabled={isLoading || loadingOccupiedDates}
            fullWidth={true}
          >
            Cancelar
          </FormButton>
        </div>
      </div>
    </form>
    </div>
  );
}