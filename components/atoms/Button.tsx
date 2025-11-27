import React from 'react';
import { buttons } from '@/utils/Tokens';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'primaryFull' | 'secondary';
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export default function Button({ 
  children, 
  onClick,
  type = 'button',
  variant = 'primary',
  className = "",
  disabled = false,
  ariaLabel
}: ButtonProps) {
  const variantClass = buttons[variant];
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantClass} ${disabledClass} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

