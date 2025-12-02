"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormField from './FormField';
import PasswordField from './PasswordField';
import FormSelect from '../atoms/FormSelect';
import Button from '../atoms/ButtonAuth';

// Schema base para validación
const baseUsuarioSchema = z.object({
  email: z.string()
    .max(40, { message: 'El email no puede superar 40 caracteres' })
    .regex(/^(?:[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)?@[A-Za-z0-9]+|[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)?)$/, {
      message: 'Formato inválido: solo letras/números, un "@" y opcionalmente un solo punto'
    }),
  telefono: z.string()
    .min(1, { message: 'El teléfono es obligatorio' })
    .regex(/^\d+$/, { message: 'El teléfono solo puede contener números' }),
  nombre: z.string()
    .min(1, { message: 'El nombre es obligatorio' })
    .max(20, { message: 'El nombre no puede superar 20 caracteres' })
    .regex(/^[A-Za-zÀ-ÿÑñ ]+$/, { message: 'El nombre solo puede contener letras y espacios' }),
  rol: z.enum(['admin', 'recepcionista', 'cliente']),
  contraseña: z.string(),
});

// Schema para creación (contraseña obligatoria)
const createUsuarioSchema = baseUsuarioSchema.extend({
  contraseña: z.string()
    .min(7, { message: 'La contraseña debe tener al menos 7 caracteres' })
    .max(15, { message: 'La contraseña no puede superar 15 caracteres' })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
      message: 'La contraseña debe incluir al menos un carácter especial'
    }),
});

// Schema para edición (contraseña opcional)
const editUsuarioSchema = baseUsuarioSchema.extend({
  contraseña: z.string()
    .min(7, { message: 'La contraseña debe tener al menos 7 caracteres' })
    .max(15, { message: 'La contraseña no puede superar 15 caracteres' })
    .refine((val) => val === '' || /[^A-Za-z0-9]/.test(val), {
      message: 'La contraseña debe incluir al menos un carácter especial'
    })
    .optional()
    .or(z.literal('')),
});

export type UsuarioFormData = z.infer<typeof createUsuarioSchema>;
export type EditUsuarioFormData = z.infer<typeof editUsuarioSchema>;

interface UsuarioFormProps {
  onSubmit: (data: UsuarioFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: {
    email: string;
    telefono: string;
    nombre: string;
    rol: 'admin' | 'recepcionista' | 'cliente';
  };
  isEditing?: boolean;
  isLoading?: boolean;
}

const roleOptions = [
  { value: 'admin', label: 'Administrador' },
  { value: 'recepcionista', label: 'Recepcionista' },
  { value: 'cliente', label: 'Cliente' },
];

export default function UsuarioForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
  isLoading = false,
}: UsuarioFormProps) {
  const usuarioSchema = isEditing ? editUsuarioSchema : createUsuarioSchema;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioSchema) as any,
    defaultValues: initialData || {
      email: '',
      telefono: '',
      nombre: '',
      rol: 'cliente',
      contraseña: '',
    },
  });

  const handleFormSubmit = async (data: UsuarioFormData) => {
    // Si es edición y no se proporcionó contraseña, eliminar el campo
    if (isEditing && (!data.contraseña || data.contraseña.trim() === '')) {
      const { contraseña, ...dataWithoutPassword } = data;
      await onSubmit(dataWithoutPassword as UsuarioFormData);
    } else {
      // Asegurarse de que la contraseña esté presente al crear
      if (!isEditing && (!data.contraseña || data.contraseña.trim() === '')) {
        return; // La validación de Zod debería prevenir esto, pero por seguridad
      }
      await onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormField
        label="Email"
        register={register('email')}
        error={errors.email}
        type="email"
        id="email"
        placeholder="mail@example.com"
      />

      <FormField
        label="Teléfono"
        register={register('telefono')}
        error={errors.telefono}
        type="text"
        id="telefono"
        placeholder="1234567890"
      />

      <FormField
        label="Nombre"
        register={register('nombre')}
        error={errors.nombre}
        type="text"
        id="nombre"
        placeholder="Nombre completo"
      />

      <FormSelect
        label="Rol"
        name="rol"
        register={register}
        error={errors.rol}
        options={roleOptions}
        required
        placeholder="Seleccione un rol"
        defaultValue={initialData?.rol || 'cliente'}
      />

      <PasswordField
        label={isEditing ? "Contraseña (dejar vacío para no cambiar)" : "Contraseña"}
        register={register('contraseña')}
        error={errors.contraseña}
        id="contraseña"
        placeholder="Password"
      />

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          variant="light"
          className="flex-1"
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}

