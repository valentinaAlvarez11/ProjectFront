import React from 'react';
import { sections } from '@/utils/Tokens';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray';
}

export default function SectionContainer({ 
  children, 
  className = "",
  background = 'white'
}: SectionContainerProps) {
  const bgClass = background === 'gray' 
    ? "bg-gradient-to-b from-gray-50 to-white" 
    : "bg-white";
  
  return (
    <div className={`${sections.container} ${bgClass} ${className}`}>
      {children}
    </div>
  );
}

