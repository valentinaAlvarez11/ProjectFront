import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  rounded?: boolean;
}

export default function Card({ 
  children, 
  className = "",
  padding = "md",
  shadow = "md",
  rounded = true
}: CardProps) {
  const paddingStyles = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };
  
  const shadowStyles = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };
  
  const roundedStyle = rounded ? "rounded-lg" : "";
  
  return (
    <div className={`bg-white ${paddingStyles[padding]} ${shadowStyles[shadow]} ${roundedStyle} ${className}`}>
      {children}
    </div>
  );
}

