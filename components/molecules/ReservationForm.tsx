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
import { useAuthStore } from '@/store/authStore';
import { formComponents, adminPage } from '@/utils/Tokens';
import { FaUser, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

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

  // Cargar habitaciones
  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoadingRooms(true);
        const response = await RoomsService.getAllAdmin();
        setRooms(response.habitaciones || []);
      } catch (error: any) {
        console.error('Error al cargar habitaciones:', error);
        setServerError('Error al cargar las habitaciones');
      } finally {
        setLoadingRooms(false);
      }
    };

    loadRooms();
  }, []);

  // Cargar usuarios solo si es admin y está creando (no editando)
  useEffect(() => {
    if (isAdmin && !isEditing) {
      const loadUsers = async () => {
        try {
          setLoadingUsers(true);
          const response = await UsersService.getAllUsersAdmin();
          // Filtrar para mostrar solo clientes (excluir admin y recepcionistas)
          const filteredUsers = (response.usuarios || []).filter(
            user => user.rol === 'cliente'
          );
          setUsers(filteredUsers);
        } catch (error: any) {
          console.error('Error al cargar usuarios:', error);
        } finally {
          setLoadingUsers(false);
        }
      };

      loadUsers();
    }
  }, [isAdmin, isEditing, currentUser]);


  // Obtener fecha mínima (hoy)
  const getMinDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split('T')[0];
  };

  // Obtener fecha mínima para fecha_fin (fecha_inicio + 1 día)
  const fechaInicioWatch = watch('fecha_inicio');
  const getMinEndDate = () => {
    if (!fechaInicioWatch) return getMinDate();
    const inicio = new Date(fechaInicioWatch);
    inicio.setDate(inicio.getDate() + 1);
    return inicio.toISOString().split('T')[0];
  };

  const handleFormSubmit = async (data: any) => {
    try {
      setServerError(null);
      
      // Validar que si es admin creando, debe tener usuarioId
      if (isAdmin && !isEditing && !data.usuarioId) {
        setServerError('Debe seleccionar un usuario para crear la reserva');
        return;
      }
      
      // Convertir habitacionId y usuarioId a número
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

  // Calcular número de noches y precios
  const fechaInicio = watch('fecha_inicio');
  const fechaFin = watch('fecha_fin');
  const habitacionId = watch('habitacionId');
  const usuarioId = watch('usuarioId');

  const selectedRoom = rooms.find(r => r.id === Number(habitacionId));
  const selectedUser = users.find(u => u.id === Number(usuarioId));

  const calculateNights = () => {
    if (!fechaInicio || !fechaFin) return 0;
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diffTime = Math.abs(fin.getTime() - inicio.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();
  const precioPorNoche = selectedRoom?.precio_noche || 0;
  const subtotal = precioPorNoche * nights;
  const total = subtotal; // Por ahora no hay impuestos ni descuentos

  const roomOptions = rooms.map(room => ({
    value: room.id.toString(),
    label: `${room.numero} - ${room.tipo} ($${room.precio_noche.toLocaleString()}/noche)`,
  }));

  const userOptions = users.map(user => ({
    value: user.id.toString(),
    label: `${user.nombre} (${user.email})`,
  }));

  const estadoOptions = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'confirmada', label: 'Confirmada' },
    { value: 'cancelada', label: 'Cancelada' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-6">
      {serverError && (
        <div className={`${adminPage.alert.error} mb-4`}>
          <p className={adminPage.alert.errorText}>{serverError}</p>
        </div>
      )}

      {/* Información del Usuario (solo para admin al crear) */}
      {isAdmin && !isEditing && (
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0a174e] border-b-2 border-[#b6a253] pb-2">
            Información del Usuario
          </h2>

          <FormSelect
            label="Usuario"
            name="usuarioId"
            register={register}
            error={(errors as any).usuarioId}
            options={userOptions}
            required
            placeholder="Seleccione un usuario"
            defaultValue=""
          />

          {selectedUser && (
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border-2 border-[#b6a253]/30 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-[#0a174e] to-[#222a54] rounded-lg">
                  <FaUser className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Nombre Completo</p>
                  <p className="text-base font-bold text-[#0a174e]">{selectedUser.nombre}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-[#b6a253] to-[#d4c373] rounded-lg">
                  <FaEnvelope className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Email</p>
                  <p className="text-sm text-gray-700">{selectedUser.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-[#0a174e] to-[#222a54] rounded-lg">
                  <FaMapMarkerAlt className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Dirección de Contacto</p>
                  <p className="text-sm text-gray-700">{selectedUser.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Tel: {selectedUser.telefono}</p>
                </div>
              </div>
            </div>
          )}

          {loadingUsers && (
            <div className="text-center py-2">
              <p className="text-gray-600 text-sm">Cargando usuarios...</p>
            </div>
          )}
        </div>
      )}

      {/* Información de la Reserva */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#0a174e] border-b-2 border-[#b6a253] pb-2">
          Información de la Reserva
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <FormSelect
            label="Habitación"
            name="habitacionId"
            register={register}
            error={errors.habitacionId}
            options={roomOptions}
            required
            placeholder="Seleccione una habitación"
            defaultValue={initialData?.habitacionId.toString()}
          />

          {isEditing && (
            <FormSelect
              label="Estado"
              name="estado"
              register={register}
              error={(errors as any).estado}
              options={estadoOptions}
              required
              placeholder="Seleccione un estado"
              defaultValue={initialData?.estado}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
              className={`${formComponents.inputBase} ${
                errors.fecha_inicio 
                  ? formComponents.inputError
                  : formComponents.inputNormal
              }`}
            />
            {errors.fecha_inicio && (
              <p className={formComponents.errorText}>
                {errors.fecha_inicio.message}
              </p>
            )}
          </div>

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
              className={`${formComponents.inputBase} ${
                errors.fecha_fin 
                  ? formComponents.inputError
                  : formComponents.inputNormal
              }`}
            />
            {errors.fecha_fin && (
              <p className={formComponents.errorText}>
                {errors.fecha_fin.message}
              </p>
            )}
          </div>
        </div>

        {loadingRooms && (
          <div className="text-center py-4">
            <p className="text-gray-600">Cargando habitaciones...</p>
          </div>
        )}

        {/* Resumen de Precios - Mostrar siempre que haya habitación y fechas */}
        {selectedRoom && fechaInicio && fechaFin && nights > 0 && (
          <div className="bg-gradient-to-br from-[#0a174e]/10 to-[#222a54]/10 rounded-xl p-5 border-2 border-[#b6a253]/30 space-y-3">
            <h3 className="text-lg font-bold text-[#0a174e] border-b-2 border-[#b6a253] pb-2">
              {isEditing ? 'Resumen de Precios (Actualizado)' : 'Resumen de Precios'}
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Precio por noche:</span>
                <span className="font-semibold text-[#0a174e]">{formatCurrency(precioPorNoche)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Número de noches:</span>
                <span className="font-semibold text-[#0a174e]">{nights} {nights === 1 ? 'noche' : 'noches'}</span>
              </div>
              {isEditing && initialData && (
                <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                  <span className="text-xs text-gray-500">Precio anterior:</span>
                  <span className="text-xs text-gray-500 line-through">{formatCurrency(initialData.precio_total)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                <span className="text-base font-semibold text-gray-700">Subtotal:</span>
                <span className="font-bold text-lg text-[#0a174e]">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t-2 border-[#b6a253]">
                <span className="text-lg font-bold text-[#0a174e]">Total {isEditing ? '(Nuevo)' : ''}:</span>
                <span className="font-bold text-2xl text-[#b6a253]">{formatCurrency(total)}</span>
              </div>
              {isEditing && (
                <p className="text-xs text-[#b6a253] font-semibold mt-2 text-center">
                  El precio se actualizará automáticamente al guardar
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <FormButton
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={isLoading || loadingRooms}
        >
          {isLoading ? 'Guardando...' : isEditing ? 'Actualizar Reserva' : 'Crear Reserva'}
        </FormButton>
        <FormButton
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
          disabled={isLoading}
        >
          Cancelar
        </FormButton>
      </div>
    </form>
  );
}

