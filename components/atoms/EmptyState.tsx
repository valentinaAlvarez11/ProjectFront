import React from 'react';
import { states } from '@/utils/Tokens';

interface EmptyStateProps {
  message: string;
  className?: string;
}

export default function EmptyState({ 
  message, 
  className = "" 
}: EmptyStateProps) {
  return (
    <div className={`${states.empty} ${className}`}>
      <p className={states.emptyText}>{message}</p>
    </div>
  );
}

