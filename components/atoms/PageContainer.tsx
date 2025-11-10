import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
}

export default function PageContainer({
  children,
  className = "",
  maxWidth = "full",
  padding = true,
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  };

  const paddingClass = padding ? "px-4 sm:px-6 lg:px-8 py-8" : "";

  return (
    <div className={`min-h-screen bg-gray-100 ${maxWidthClasses[maxWidth]} mx-auto ${paddingClass} ${className}`}>
      {children}
    </div>
  );
}

