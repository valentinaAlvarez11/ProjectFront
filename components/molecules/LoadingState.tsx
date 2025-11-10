import React from "react";
import LoadingSpinner from "../atoms/LoadingSpinner";

interface LoadingStateProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
}

export default function LoadingState({
  isLoading,
  children,
  loadingText = "Cargando...",
  className = "",
}: LoadingStateProps) {
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
        <LoadingSpinner size="lg" text={loadingText} />
      </div>
    );
  }

  return <>{children}</>;
}

