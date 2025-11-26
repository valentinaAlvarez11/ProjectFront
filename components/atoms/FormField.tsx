import React from "react";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
}

export default function FormField({
  label,
  children,
  error,
  required = false,
  className = "",
}: FormFieldProps) {
  return (
    <div className={className}>
      <label className="block text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

