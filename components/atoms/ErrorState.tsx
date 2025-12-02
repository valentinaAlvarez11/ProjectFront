import React from 'react';
import { states } from '@/utils/Tokens';

interface ErrorStateProps {
  message: string;
  className?: string;
}

export default function ErrorState({ 
  message, 
  className = "" 
}: ErrorStateProps) {
  return (
    <div className={`${states.error} ${className}`}>
      <p className={states.errorText}>{message}</p>
    </div>
  );
}


