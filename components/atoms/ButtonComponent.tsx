import React from "react";
import LoadingSpinner from "./LoadingSpinner";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function ButtonComponent({
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled,
  className = "",
  children,
  ...rest
}: ButtonComponentProps) {
  const baseStyles = "rounded-md font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "bg-[#b6a253] text-white hover:bg-[#a6934a]",
    secondary: "bg-[#0f1b3a] text-white hover:bg-[#0b1630]",
    outline: "bg-transparent border-2 border-[#b6a253] text-[#b6a253] hover:bg-[#b6a253] hover:text-white",
    ghost: "bg-transparent text-[#b6a253] hover:bg-[#b6a253]/10",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  const widthStyle = fullWidth ? "w-full" : "";
  
  return (
    <button
      {...rest}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <LoadingSpinner size="sm" />
          <span>Cargando...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
