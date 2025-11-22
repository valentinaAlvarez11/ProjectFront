"use client";

import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  error?: string;
}

export default function Input({ register, error, className = "", ...rest }: InputProps) {
  const baseStyles = "mt-1 w-full border border-gray-600 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#b6a253] focus:border-[#b6a253] bg-[#1a1f3a] text-white placeholder-gray-400";
  const errorStyles = error ? "border-red-500 focus:ring-red-500" : "";
  
  return (
    <>
      <input
        {...register}
        {...rest}
        className={`${baseStyles} ${errorStyles} ${className}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </>
  );
}

