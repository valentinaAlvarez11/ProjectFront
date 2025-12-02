import React from 'react';
import { carousel } from '@/utils/Tokens';

interface CarouselIndicatorsProps {
  total: number;
  current: number;
  onIndicatorClick: (index: number) => void;
}

export default function CarouselIndicators({ 
  total, 
  current, 
  onIndicatorClick 
}: CarouselIndicatorsProps) {
  return (
    <div className={carousel.indicators}>
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onIndicatorClick(idx)}
          className={`${carousel.indicator} ${
            current === idx 
              ? carousel.indicatorActive 
              : carousel.indicatorInactive
          }`}
          aria-label={`Ir a slide ${idx + 1}`}
        />
      ))}
    </div>
  );
}


