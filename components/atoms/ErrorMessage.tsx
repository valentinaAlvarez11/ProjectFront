import React from "react";

interface ErrorMessageProps {
  message: string;
  className?: string;
  variant?: "default" | "inline";
}

export default function ErrorMessage({ 
  message, 
  className = "",
  variant = "default"
}: ErrorMessageProps) {
  const baseStyles = variant === "inline" 
    ? "text-red-500 text-sm mt-1" 
    : "text-center text-red-600 font-semibold";
  
  return (
    <div className={className}>
      <p className={baseStyles}>{message}</p>
    </div>
  );
}

