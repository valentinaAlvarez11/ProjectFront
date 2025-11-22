"use client";

import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import Input from "../atoms/Input";

interface FormFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  type?: "text" | "email" | "password";
  id: string;
  placeholder?: string;
}

export default function FormField({
  label,
  register,
  error,
  type = "text",
  id,
  placeholder,
}: FormFieldProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-white">
          {label}
        </label>
      )}
      <Input
        register={register}
        type={type}
        id={id}
        placeholder={placeholder}
        error={error?.message}
      />
    </div>
  );
}

