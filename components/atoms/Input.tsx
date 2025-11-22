"use client";

import { UseFormRegisterReturn } from "react-hook-form";
import { darkInputBase, darkInputError, formErrorText } from "@/utils/Tokens";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  error?: string;
}

export default function Input({ register, error, className = "", ...rest }: InputProps) {
  const errorStyles = error ? darkInputError : "";
  
  return (
    <>
      <input
        {...register}
        {...rest}
        className={`${darkInputBase} ${errorStyles} ${className}`}
      />
      {error && (
        <p className={`mt-1 ${formErrorText}`}>{error}</p>
      )}
    </>
  );
}

