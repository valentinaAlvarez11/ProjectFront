"use client";

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'url';
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  register,
  error,
  placeholder,
  required = false,
  min,
  max,
  step,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label 
        htmlFor={name} 
        className="text-sm font-semibold text-[#0a1445]"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...register(name, { valueAsNumber: type === 'number' })}
        type={type}
        id={name}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={`
          w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-1
          text-sm sm:text-base
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

export default FormInput;

