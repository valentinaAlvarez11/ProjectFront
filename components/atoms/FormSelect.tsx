"use client";

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  options: Option[];
  required?: boolean;
  placeholder?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  register,
  error,
  options,
  required = false,
  placeholder = 'Seleccione una opción',
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label 
        htmlFor={name} 
        className="text-sm font-semibold text-[#0a1445]"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...register(name)}
        id={name}
        className={`
          w-full px-4 py-3 border-2 rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-2
          ${error 
            ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
            : 'border-[#222a54] focus:border-[#b6a253] focus:ring-[#b6a253]/20'
          }
          bg-white text-[#0a1445]
          cursor-pointer
        `}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-500 font-medium">{error.message}</p>
      )}
    </div>
  );
};

export default FormSelect;

