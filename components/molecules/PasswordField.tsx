"use client";

import { useState } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Input from "../atoms/Input";

interface PasswordFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  id: string;
  placeholder?: string;
}

export default function PasswordField({
  label,
  register,
  error,
  id,
  placeholder,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-white">
          {label}
        </label>
      )}
      <div className="relative">
        <Input
          register={register}
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          error={error?.message}
          className="pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[calc(50%-4px)] -translate-y-1/2 flex items-center justify-center text-white hover:text-gray-300 focus:outline-none transition-colors z-10"
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} className="flex-shrink-0" />
          ) : (
            <AiOutlineEye size={20} className="flex-shrink-0" />
          )}
        </button>
      </div>
    </div>
  );
}

