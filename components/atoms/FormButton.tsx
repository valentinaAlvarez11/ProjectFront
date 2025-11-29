"use client";

import React from 'react';
import { formComponents } from '@/utils/Tokens';

interface FormButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  fullWidth?: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({
  type = 'button',
  onClick,
  disabled = false,
  children,
  variant = 'primary',
  className = '',
  fullWidth = true,
}) => {
  const widthClass = fullWidth ? 'w-full' : 'w-auto';
  const variantStyles = variant === 'primary'
    ? formComponents.buttonPrimary
    : formComponents.buttonSecondary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${formComponents.buttonBase} ${variantStyles} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default FormButton;

