import React from 'react';
import { states } from '@/utils/Tokens';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export default function LoadingState({ 
  message = "Cargando...", 
  className = "" 
}: LoadingStateProps) {
  return (
    <div className={`${states.loading} ${className}`}>
      <p className={states.loadingText}>{message}</p>
    </div>
  );
}


