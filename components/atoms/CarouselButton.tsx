import React from 'react';
import { carousel } from '@/utils/Tokens';

interface CarouselButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  ariaLabel: string;
}

export default function CarouselButton({ 
  direction, 
  onClick, 
  ariaLabel 
}: CarouselButtonProps) {
  const positionClass = direction === 'prev' 
    ? carousel.buttonLeft 
    : carousel.buttonRight;
  
  const arrow = direction === 'prev' ? '←' : '→';
  
  return (
    <button
      onClick={onClick}
      className={`${carousel.button} ${positionClass}`}
      aria-label={ariaLabel}
    >
      {arrow}
    </button>
  );
}


