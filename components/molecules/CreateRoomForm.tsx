"use client";

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { createRoomSchema, CreateRoomFormData } from '@/schemas/room';
import RoomsService from '@/libs/rooms.service';
import FormInput from '@/components/atoms/FormInput';
import FormTextarea from '@/components/atoms/FormTextarea';
import FormSelect from '@/components/atoms/FormSelect';
import FormCheckbox from '@/components/atoms/FormCheckbox';
import FormButton from '@/components/atoms/FormButton';
import ImageUrlInput from './ImageUrlInput';

const CreateRoomForm: React.FC = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
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
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'imagenes',
  });

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

      const payload = {
        numero: data.numero,
        tipo: data.tipo,
        precio_noche: data.precio_noche,
        descripcion: data.descripcion || null,
        caracteristicas: data.caracteristicas,
        imagenes: imagenesUrls,
      };

      const response = await RoomsService.createRoom(payload);
      
      alert(`Habitación creada exitosamente. ID: ${response.id}`);
      reset();
      router.push('/');
    } catch (err: any) {
      console.error('Error al crear habitación:', err);
      
      // Manejar errores específicos de autenticación
      if (err?.status === 401 || err?.message?.includes('Token requerido')) {
        setServerError('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else if (err?.status === 403 || err?.message?.includes('administradores')) {
        setServerError('Acceso denegado. Solo los administradores pueden crear habitaciones.');
      } else {
        setServerError(err?.message || 'Error al crear la habitación. Por favor, intente nuevamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl border-2 border-[#222a54] overflow-hidden">
        {/* Header del formulario */}
        <div className="bg-[#0a1445] border-b-[3px] border-[#b6a253] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Crear Nueva Habitación</h1>
          <p className="text-gray-300 mt-2 text-sm sm:text-base">Complete el formulario para agregar una nueva habitación al sistema</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
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
              {isSubmitting ? 'Creando...' : 'Crear Habitación'}
            </FormButton>
            <FormButton
              type="button"
              onClick={() => reset()}
              variant="secondary"
            >
              Limpiar Formulario
            </FormButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomForm;

