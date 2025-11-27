"use client";

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { formComponents } from '@/utils/Tokens';

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
        className={formComponents.label}
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
        className={`${formComponents.inputBase} ${
          error 
            ? formComponents.inputError
            : formComponents.inputNormal
        }`}
      />
      {error && (
        <p className={formComponents.errorText}>{error.message}</p>
      )}
    </div>
  );
};

export default FormInput;

