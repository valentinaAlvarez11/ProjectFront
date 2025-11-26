"use client";

import React from 'react';
import {
  serviceCardContainer,
  serviceCardIconContainer,
  serviceCardIcon,
  serviceCardTitle,
  serviceCardDescription,
} from '@/utils/Tokens';

interface ServiceCardProps {
  icon: string; // Emoji o texto del icono
  title: string;
  description?: string;
}

/**
 * Componente reutilizable para mostrar tarjetas de servicios
 * Sigue el estilo de diseño de la aplicación
 */
const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className={serviceCardContainer}>
      <div className="p-6 sm:p-8">
        <div className={serviceCardIconContainer}>
          <span className={serviceCardIcon} role="img" aria-label={title}>
            {icon}
          </span>
        </div>
        <h3 className={serviceCardTitle}>
          {title}
        </h3>
        {description && (
          <p className={serviceCardDescription}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;


