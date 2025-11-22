"use client";

import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import Input from "../atoms/Input";
import { formFieldContainer, formLabel } from "@/utils/Tokens";

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
    <div className={formFieldContainer}>
      {label && (
        <label htmlFor={id} className={formLabel}>
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

