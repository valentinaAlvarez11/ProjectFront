"use client";

import React from 'react';
import {
  restaurantFeatureCard,
  restaurantFeatureIcon,
  restaurantFeatureTitle,
  restaurantFeatureDescription,
  restaurantFeatureList,
  restaurantFeatureItem,
  restaurantFeatureCheck,
  restaurantFeatureText,
} from '@/utils/Tokens';

interface Feature {
  text: string;
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description?: string;
  features?: Feature[];
}

/**
 * Componente reutilizable para mostrar tarjetas de características
 * Usado para restaurante y bar
 */
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  features,
}) => {
  return (
    <div className={restaurantFeatureCard}>
      <div className="text-center mb-6">
        <div className={restaurantFeatureIcon} role="img" aria-label={title}>
          {icon}
        </div>
        <h3 className={restaurantFeatureTitle}>
          {title}
        </h3>
        {description && (
          <p className={restaurantFeatureDescription}>
            {description}
          </p>
        )}
      </div>
      
      {features && features.length > 0 && (
        <ul className={restaurantFeatureList}>
          {features.map((feature, index) => (
            <li key={index} className={restaurantFeatureItem}>
              <span className={restaurantFeatureCheck}>✓</span>
              <span className={restaurantFeatureText}>{feature.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeatureCard;



