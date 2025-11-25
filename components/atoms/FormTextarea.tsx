"use client";

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormTextareaProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  register,
  error,
  placeholder,
  required = false,
  rows = 4,
  maxLength,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label 
        htmlFor={name} 
        className="text-sm font-semibold text-[#0a1445]"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        {...register(name)}
        id={name}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={`
          w-full px-4 py-3 border-2 rounded-lg resize-none
          transition-all duration-200
          focus:outline-none focus:ring-2
          ${error 
            ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
            : 'border-[#222a54] focus:border-[#b6a253] focus:ring-[#b6a253]/20'
          }
          bg-white text-[#0a1445]
          placeholder:text-gray-400
        `}
      />
      {error && (
        <p className="text-sm text-red-500 font-medium">{error.message}</p>
      )}
    </div>
  );
};

export default FormTextarea;

