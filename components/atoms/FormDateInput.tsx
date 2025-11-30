"use client";

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { formComponents } from '@/utils/Tokens';

interface FormDateInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  min?: string;
  max?: string;
  disabled?: boolean;
  placeholder?: string;
}

const FormDateInput: React.FC<FormDateInputProps> = ({
  label,
  name,
  register,
  error,
  required = false,
  min,
  max,
  disabled = false,
  placeholder,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label 
        htmlFor={name} 
        className={formComponents.label}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...register(name)}
        type="date"
        id={name}
        min={min}
        max={max}
        disabled={disabled}
        placeholder={placeholder}
        className={`${formComponents.inputBase} ${
          error 
            ? formComponents.inputError
            : formComponents.inputNormal
        } ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
      />
      {error && (
        <p className={formComponents.errorText}>{error.message}</p>
      )}
    </div>
  );
};

export default FormDateInput;

