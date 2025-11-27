import React from 'react';
import { admin } from '@/utils/Tokens';

interface InfoCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function InfoCard({ 
  children, 
  className = "" 
}: InfoCardProps) {
  return (
    <div className={`${admin.infoCard.container} ${className}`}>
      {children}
    </div>
  );
}

