"use client";

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { createRoomSchema, CreateRoomFormData } from '@/schemas/room';
import RoomsService from '@/libs/rooms.service';
import { IRoom, IRoomFeatures } from '@/interfaces/rooms';
import FormInput from '@/components/atoms/FormInput';
import FormTextarea from '@/components/atoms/FormTextarea';
import FormSelect from '@/components/atoms/FormSelect';
import FormCheckbox from '@/components/atoms/FormCheckbox';
import FormButton from '@/components/atoms/FormButton';
import ImageUrlInput from './ImageUrlInput';

interface CreateRoomFormProps {
  onSuccess?: () => void;
  hideHeader?: boolean;
  initialData?: IRoom;
  isEditing?: boolean;
}

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ 
  onSuccess, 
  hideHeader = false, 
  initialData,
  isEditing = false 
}) => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disponible, setDisponible] = useState<boolean>(initialData?.disponible ?? true);

  // Función para convertir IRoom a CreateRoomFormData
  const convertRoomToFormData = (room: IRoom): CreateRoomFormData => {
    let caracteristicas: IRoomFeatures = {
      tamano: '',
      camas: '',
      vista: '',
      instalaciones: {
        wifi: false,
        television: false,
        aireAcondicionado: false,
        banoDucha: false,
        plancha: false,
        toallas: false,
        smartTV: false,
        refrigerador: false,
      },
    };

    // Manejar características que pueden ser objeto o array
    if (room.caracteristicas) {
      if (typeof room.caracteristicas === 'object' && !Array.isArray(room.caracteristicas)) {
        caracteristicas = room.caracteristicas;
      }
    }

    return {
      numero: room.numero,
      tipo: room.tipo,
      precio_noche: room.precio_noche,
      descripcion: room.descripcion || '',
      caracteristicas,
      imagenes: room.imagenes || [],
    };
  };

  const defaultValues: CreateRoomFormData = initialData 
    ? convertRoomToFormData(initialData)
    : {
        numero: '',
        tipo: '',
        precio_noche: 0,
        descripcion: '',
        caracteristicas: {
          tamano: '',
          camas: '',
          vista: '',
          instalaciones: {
            wifi: false,
            television: false,
            aireAcondicionado: false,
            banoDucha: false,
            plancha: false,
            toallas: false,
            smartTV: false,
            refrigerador: false,
          },
        },
        imagenes: [],
      };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'imagenes',
  });

  // Efecto para cargar datos iniciales cuando cambian
  useEffect(() => {
    if (initialData && isEditing) {
      const formData = convertRoomToFormData(initialData);
      setDisponible(initialData.disponible);
      
      // Resetear el formulario con los datos
      reset({
        ...formData,
        imagenes: [], // Inicializar vacío, se poblará después
      });
      
      // Poblar el fieldArray de imágenes después de un pequeño delay
      const timer = setTimeout(() => {
        // Limpiar imágenes existentes
        const currentLength = fields.length;
        for (let i = currentLength - 1; i >= 0; i--) {
          remove(i);
        }
        // Agregar nuevas imágenes
        if (formData.imagenes && formData.imagenes.length > 0) {
          formData.imagenes.forEach((img) => {
            if (img && img.trim() !== '') {
              append(img);
            }
          });
        }
      }, 50);
      
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData?.id, isEditing]);

  const tipoOptions = [
    { value: 'Estándar', label: 'Estándar' },
    { value: 'Superior', label: 'Superior' },
    { value: 'Suite', label: 'Suite' },
    { value: 'Deluxe', label: 'Deluxe' },
    { value: 'Presidencial', label: 'Presidencial' },
  ];

  const tamanoOptions = [
    { value: '20 m²', label: '20 m²' },
    { value: '25 m²', label: '25 m²' },
    { value: '30 m²', label: '30 m²' },
    { value: '35 m²', label: '35 m²' },
    { value: '40 m²', label: '40 m²' },
    { value: '50 m²', label: '50 m²' },
    { value: '60 m²', label: '60 m²' },
    { value: '80 m²', label: '80 m²' },
  ];

  const camasOptions = [
    { value: '1 Cama Individual', label: '1 Cama Individual' },
    { value: '2 Camas Individuales', label: '2 Camas Individuales' },
    { value: '1 Cama Doble', label: '1 Cama Doble' },
    { value: '1 Cama King', label: '1 Cama King' },
    { value: '2 Camas Dobles', label: '2 Camas Dobles' },
  ];

  const vistaOptions = [
    { value: 'Vista al Mar', label: 'Vista al Mar' },
    { value: 'Vista a la Ciudad', label: 'Vista a la Ciudad' },
    { value: 'Vista al Jardín', label: 'Vista al Jardín' },
    { value: 'Vista Interior', label: 'Vista Interior' },
  ];

  const instalacionesLabels = [
    { key: 'wifi', label: 'WiFi Gratuito' },
    { key: 'television', label: 'Televisión por Cable' },
    { key: 'aireAcondicionado', label: 'Aire Acondicionado' },
    { key: 'banoDucha', label: 'Baño Privado con Ducha' },
    { key: 'plancha', label: 'Plancha y Tabla' },
    { key: 'toallas', label: 'Juego de Toallas' },
    { key: 'smartTV', label: 'Smart TV' },
    { key: 'refrigerador', label: 'Refrigerador / Minibar' },
  ];

  const onSubmit = async (data: CreateRoomFormData) => {
    try {
      setIsSubmitting(true);
      setServerError(null);

      // Convertir array de strings a array de URLs
      const imagenesUrls = data.imagenes.filter(url => url && url.trim() !== '');

      if (isEditing && initialData) {
        // Modo edición: actualizar habitación
        const updatePayload = {
          numero: data.numero,
          tipo: data.tipo,
          precio_noche: data.precio_noche,
          descripcion: data.descripcion || null,
          caracteristicas: data.caracteristicas,
          imagenes: imagenesUrls,
          disponible: disponible, // Usar el estado local
        };

        await RoomsService.updateRoom(initialData.id, updatePayload);
        alert('Habitación actualizada exitosamente');
      } else {
        // Modo creación: crear nueva habitación
        const createPayload = {
          numero: data.numero,
          tipo: data.tipo,
          precio_noche: data.precio_noche,
          descripcion: data.descripcion || null,
          caracteristicas: data.caracteristicas,
          imagenes: imagenesUrls,
        };

        const response = await RoomsService.createRoom(createPayload);
        alert(`Habitación creada exitosamente. ID: ${response.id}`);
        reset();
      }
      
      // Si hay un callback de éxito, usarlo; si no, redirigir
      if (onSuccess) {
        onSuccess();
      } else if (!isEditing) {
        router.push('/');
      }
    } catch (err: any) {
      console.error(`Error al ${isEditing ? 'actualizar' : 'crear'} habitación:`, err);
      
      // Manejar errores específicos de autenticación
      if (err?.status === 401 || err?.message?.includes('Token requerido')) {
        setServerError('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else if (err?.status === 403 || err?.message?.includes('administradores')) {
        setServerError('Acceso denegado. Solo los administradores pueden gestionar habitaciones.');
      } else {
        setServerError(err?.message || `Error al ${isEditing ? 'actualizar' : 'crear'} la habitación. Por favor, intente nuevamente.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={hideHeader ? "w-full" : "max-w-4xl mx-auto p-4 sm:p-6 lg:p-8"}>
      <div className={hideHeader ? "w-full" : "bg-white rounded-2xl shadow-xl border-2 border-[#222a54] overflow-hidden"}>
        {/* Header del formulario */}
        {!hideHeader && (
          <div className="bg-[#0a1445] border-b-[3px] border-[#b6a253] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Crear Nueva Habitación</h1>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">Complete el formulario para agregar una nueva habitación al sistema</p>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className={hideHeader ? "p-0 space-y-4 sm:space-y-6" : "p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6"}>
          {serverError && (
            <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-semibold">{serverError}</p>
            </div>
          )}

          {/* Información Básica */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#0a1445] border-b-2 border-[#b6a253] pb-2">
              Información Básica
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <FormInput
                label="Número de Habitación"
                name="numero"
                type="text"
                register={register}
                error={errors.numero}
                placeholder="Ej: 101"
                required
              />
              
              <FormSelect
                label="Tipo de Habitación"
                name="tipo"
                register={register}
                error={errors.tipo}
                options={tipoOptions}
                required
              />
              
              <FormInput
                label="Precio por Noche"
                name="precio_noche"
                type="number"
                register={register}
                error={errors.precio_noche}
                placeholder="0.00"
                required
                min={0.01}
                step={0.01}
              />
            </div>

            <FormTextarea
              label="Descripción"
              name="descripcion"
              register={register}
              error={errors.descripcion}
              placeholder="Descripción detallada de la habitación..."
              rows={4}
              maxLength={500}
            />

            {/* Campo Disponible solo en modo edición */}
            {isEditing && initialData && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={disponible}
                    onChange={(e) => setDisponible(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-[#222a54] text-[#b6a253] focus:border-[#b6a253] focus:ring-[#b6a253]/20 cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-[#0a1445]">
                    Habitación Disponible
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Características */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#0a1445] border-b-2 border-[#b6a253] pb-2">
              Características
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <FormSelect
                label="Tamaño"
                name="caracteristicas.tamano"
                register={register}
                error={errors.caracteristicas?.tamano}
                options={tamanoOptions}
                required
              />
              
              <FormSelect
                label="Camas"
                name="caracteristicas.camas"
                register={register}
                error={errors.caracteristicas?.camas}
                options={camasOptions}
                required
              />
              
              <FormSelect
                label="Vista"
                name="caracteristicas.vista"
                register={register}
                error={errors.caracteristicas?.vista}
                options={vistaOptions}
                required
              />
            </div>
          </div>

          {/* Instalaciones */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#0a1445] border-b-2 border-[#b6a253] pb-2">
              Instalaciones
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {instalacionesLabels.map((inst) => (
                <FormCheckbox
                  key={inst.key}
                  label={inst.label}
                  name={`caracteristicas.instalaciones.${inst.key}`}
                  register={register}
                  error={errors.caracteristicas?.instalaciones?.[inst.key as keyof typeof errors.caracteristicas.instalaciones]}
                />
              ))}
            </div>
          </div>

          {/* Imágenes */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#0a1445] border-b-2 border-[#b6a253] pb-2">
              Imágenes
            </h2>
            <ImageUrlInput
              images={fields}
              register={register}
              append={append}
              remove={remove}
              error={errors.imagenes}
            />
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-[#222a54]">
            <FormButton
              type="submit"
              disabled={isSubmitting}
              variant="primary"
            >
              {isSubmitting 
                ? (isEditing ? 'Actualizando...' : 'Creando...') 
                : (isEditing ? 'Actualizar Habitación' : 'Crear Habitación')
              }
            </FormButton>
            {!isEditing && (
              <FormButton
                type="button"
                onClick={() => reset()}
                variant="secondary"
              >
                Limpiar Formulario
              </FormButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomForm;

