"use client";

import React from 'react';

interface FormButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const FormButton: React.FC<FormButtonProps> = ({
  type = 'button',
  onClick,
  disabled = false,
  children,
  variant = 'primary',
  className = '',
}) => {
  const baseStyles = `
    w-full font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl
    transition-all duration-300
    shadow-lg hover:shadow-xl
    transform hover:scale-105
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    text-center text-sm sm:text-base
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variantStyles = variant === 'primary'
    ? 'bg-[#0a1445] hover:bg-[#222a54] text-white border-2 border-[#b6a253] hover:border-[#b6a253]'
    : 'bg-white border-2 border-[#0a1445] hover:border-[#222a54] text-[#0a1445] hover:bg-[#0a1445] hover:text-white';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default FormButton;

