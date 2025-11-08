// hooks/useLoginForm.ts
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/libs/authService";
import type { LoginDTO } from "@/interfaces/login";
import { useAuthStore } from "@/store/authStore";
import { loginScheme } from "@/schemas/login";

export type LoginFormData = z.infer<typeof loginScheme>;

export default function useLoginForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const { login } = useAuthStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginScheme),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const submit = async (data: LoginFormData) => {
    try {
      setServerError(null);

      const payload: LoginDTO = { 
        email: data.email, 
        contraseña: data.password 
      };

      const response = await authService.login(payload);
      
      // Guardar en el store
      login(response.usuario);

      onSuccess?.();
      form.reset();
    } catch (err: any) {
      setServerError(err?.message ?? "Error en el login");
    }
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    formState: form.formState,
    reset: form.reset,
    submit,
    serverError,
  };
}
