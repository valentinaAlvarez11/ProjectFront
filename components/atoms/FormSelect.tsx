"use client";

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { formComponents } from '@/utils/Tokens';

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
  defaultValue?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  register,
  error,
  options,
  required = false,
  placeholder = 'Seleccione una opción',
  defaultValue,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label 
        htmlFor={name} 
        className={formComponents.label}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...register(name)}
        id={name}
        defaultValue={defaultValue}
        className={`${formComponents.selectBase} ${
          error 
            ? formComponents.selectError
            : formComponents.selectNormal
        }`}
      >
        {!defaultValue && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className={formComponents.errorText}>{error.message}</p>
      )}
    </div>
  );
};

export default FormSelect;

