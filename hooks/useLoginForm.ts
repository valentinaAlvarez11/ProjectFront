// hooks/useLoginForm.ts
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "@/libs/auth.service";
import type { ILoginPayload } from "@/interfaces/users";
import { useAuthStore } from "@/store/authStore";
import { loginScheme } from "@/schemas/login";

export type LoginFormData = z.infer<typeof loginScheme>;

export default function useLoginForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { login } = useAuthStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginScheme),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const submit = async (data: LoginFormData) => {
    try {
      setServerError(null);
      setSuccessMessage(null);

      const payload: ILoginPayload = { 
        email: data.email, 
        contraseña: data.password 
      };

      const response = await AuthService.login(payload);
      
      // Capturar mensaje de éxito del backend
      if (response.mensaje) {
        // Traducir "Login exitoso" a "Inicio de sesión exitoso"
        const message = response.mensaje === "Login exitoso" 
          ? "Inicio de sesión exitoso" 
          : response.mensaje;
        setSuccessMessage(message);
      }
      
      // Guardar en el store
      login(response.usuario);

      // Esperar un momento para mostrar el mensaje antes de redirigir
      setTimeout(() => {
        onSuccess?.();
        form.reset();
      }, 1500);
    } catch (err: any) {
      setSuccessMessage(null);
      // El mensaje de error viene del backend (ej: "Credenciales incorrectas.")
      setServerError(err?.message ?? "Error en el login");
    }
  };

  const clearServerError = () => {
    setServerError(null);
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    formState: form.formState,
    reset: form.reset,
    submit,
    serverError,
    successMessage,
    clearServerError,
  };
}
