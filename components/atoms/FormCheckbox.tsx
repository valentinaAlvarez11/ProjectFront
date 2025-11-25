"use client";

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormCheckboxProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  name,
  register,
  error,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="flex items-center space-x-3 cursor-pointer group">
        <input
          {...register(name)}
          type="checkbox"
          className={`
            w-5 h-5 rounded border-2
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${error 
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
              : 'border-[#222a54] text-[#b6a253] focus:border-[#b6a253] focus:ring-[#b6a253]/20'
            }
            cursor-pointer
          `}
        />
        <span className="text-sm font-semibold text-[#0a1445] group-hover:text-[#222a54] transition-colors">
          {label}
        </span>
      </label>
      {error && (
        <p className="text-sm text-red-500 font-medium">{error.message}</p>
      )}
    </div>
  );
};

export default FormCheckbox;

