"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "@/libs/auth.service";
import type { IRegisterPayload } from "@/interfaces/users";
import { registerSchema } from "@/schemas/register";

export type RegisterFormData = z.infer<typeof registerSchema>;

export default function useRegisterForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { 
      email: "", 
      telefono: "", 
      nombre: "", 
      contraseña: "" 
    },
    mode: "onSubmit",
  });

  const submit = async (data: RegisterFormData) => {
    try {
      setServerError(null);
      setSuccessMessage(null);

      const payload: IRegisterPayload = { 
        email: data.email, 
        telefono: data.telefono,
        nombre: data.nombre,
        contraseña: data.contraseña 
      };

      const response = await AuthService.register(payload);
      
      // Capturar mensaje de éxito del backend
      if (response.mensaje) {
        setSuccessMessage(response.mensaje);
      }

      // Esperar un momento para mostrar el mensaje antes de redirigir
      setTimeout(() => {
        onSuccess?.();
        form.reset();
      }, 1500);
    } catch (err: any) {
      setSuccessMessage(null);
      // El mensaje de error viene del backend
      setServerError(err?.message ?? "Error en el registro");
    }
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    formState: form.formState,
    reset: form.reset,
    submit,
    serverError,
    successMessage,
  };
}

