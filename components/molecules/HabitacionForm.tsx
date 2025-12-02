"use client";

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRoomSchema, CreateRoomFormData } from '@/schemas/room';
import { IRoom, IRoomUpdatePayload } from '@/interfaces/rooms';
import FormInput from '@/components/atoms/FormInput';
import FormTextarea from '@/components/atoms/FormTextarea';
import FormSelect from '@/components/atoms/FormSelect';
import FormCheckbox from '@/components/atoms/FormCheckbox';
import FormButton from '@/components/atoms/FormButton';
import ImageUrlInput from './ImageUrlInput';

interface HabitacionFormProps {
  habitacion?: IRoom;
  onSubmit: (data: CreateRoomFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const HabitacionForm: React.FC<HabitacionFormProps> = ({
  habitacion,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const isEditMode = !!habitacion;

  // Convertir características de habitación existente al formato del formulario
  const getDefaultCaracteristicas = () => {
    if (!habitacion?.caracteristicas) {
      return {
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
    }

    if (typeof habitacion.caracteristicas === 'object' && !Array.isArray(habitacion.caracteristicas)) {
      return habitacion.caracteristicas;
    }

    // Si es array, crear estructura básica
    return {
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
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema) as any,
    defaultValues: habitacion
      ? {
          numero: habitacion.numero,
          tipo: habitacion.tipo,
          precio_noche: habitacion.precio_noche,
          descripcion: habitacion.descripcion || '',
          caracteristicas: getDefaultCaracteristicas(),
          imagenes: habitacion.imagenes || [],
        }
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
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: control as any,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Información Básica */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#0a1445] border-b-2 border-[#b6a253] pb-2">
          Información Básica
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <h3 className="text-lg font-bold text-[#0a1445] border-b-2 border-[#b6a253] pb-2">
          Características
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
        <h3 className="text-lg font-bold text-[#0a1445] border-b-2 border-[#b6a253] pb-2">
          Instalaciones
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {instalacionesLabels.map((inst) => (
            <FormCheckbox
              key={inst.key}
              label={inst.label}
              name={`caracteristicas.instalaciones.${inst.key}`}
              register={register}
              error={errors.caracteristicas?.instalaciones?.[inst.key as keyof typeof errors.caracteristicas.instalaciones] as any}
            />
          ))}
        </div>
      </div>

      {/* Imágenes */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#0a1445] border-b-2 border-[#b6a253] pb-2">
          Imágenes
        </h3>
        <ImageUrlInput
          images={fields}
          register={register}
          append={append}
          remove={remove}
          error={errors.imagenes as any}
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
            ? (isEditMode ? 'Guardando...' : 'Creando...') 
            : (isEditMode ? 'Guardar Cambios' : 'Crear Habitación')
          }
        </FormButton>
        <FormButton
          type="button"
          onClick={onCancel}
          variant="secondary"
        >
          Cancelar
        </FormButton>
      </div>
    </form>
  );
};

export default HabitacionForm;

