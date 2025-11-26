"use client";

import React from 'react';
import ServiceCard from '@/components/molecules/ServiceCard';
import { sectionTitle, servicesSectionContainer, servicesGrid } from '@/utils/Tokens';

interface Service {
  icon: string;
  title: string;
  description?: string;
}

const services: Service[] = [
  {
    icon: '🏊',
    title: 'Piscina',
    description: 'Piscina interior y exterior para tu disfrute',
  },
  {
    icon: '💆',
    title: 'Spa',
    description: 'Relájate con nuestros tratamientos de spa',
  },
  {
    icon: '🧖',
    title: 'Sauna',
    description: 'Disfruta de nuestro sauna tradicional',
  },
  {
    icon: '🛁',
    title: 'Baño Turco',
    description: 'Experiencia de relajación y bienestar',
  },
  {
    icon: '💪',
    title: 'Gimnasio / Fitness Center',
    description: 'Mantente en forma con equipos modernos',
  },
  {
    icon: '🧘',
    title: 'Clases de Yoga o Deporte',
    description: 'Actividades físicas para todos los niveles',
  },
  {
    icon: '🌊',
    title: 'Zona Húmeda / Jacuzzi',
    description: 'Relájate en nuestra zona húmeda con jacuzzi',
  },
  {
    icon: '✨',
    title: 'Masajes y Tratamientos Corporales',
    description: 'Tratamientos profesionales para tu bienestar',
  },
];

/**
 * Componente que muestra la sección de servicios del hotel
 * Usa componentes reutilizables y tokens de diseño
 */
const ServicesSection: React.FC = () => {
  return (
    <div className={servicesSectionContainer}>
      <h2 className={sectionTitle}>
        SERVICIOS
      </h2>
      <p className="max-w-4xl text-center text-base sm:text-lg md:text-xl text-[#233876] mb-8 sm:mb-12 lg:mb-16 leading-relaxed px-4 mx-auto">
        Disfruta de nuestros servicios premium diseñados para tu comodidad y bienestar durante tu estadía en Hotel Regatta Cartagena.
      </p>
      <div className={servicesGrid}>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;


