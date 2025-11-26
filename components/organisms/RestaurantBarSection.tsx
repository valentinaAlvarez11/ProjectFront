"use client";

import React from 'react';
import Image from 'next/image';
import FeatureCard from '@/components/molecules/FeatureCard';
import {
  restaurantSectionContainer,
  restaurantContentGrid,
  restaurantImageContainer,
  restaurantInfoCard,
  restaurantInfoTitle,
  restaurantInfoText,
  restaurantScheduleItem,
  restaurantScheduleDay,
  restaurantScheduleTime,
} from '@/utils/Tokens';

const restaurantFeatures = [
  { text: 'Cocina internacional y local' },
  { text: 'Menú variado para todos los gustos' },
  { text: 'Ambiente elegante y acogedor' },
  { text: 'Vista panorámica al mar Caribe' },
  { text: 'Servicio de room service disponible' },
  { text: 'Opciones vegetarianas y veganas' },
];

const barFeatures = [
  { text: 'Coctelería de autor' },
  { text: 'Selección premium de vinos' },
  { text: 'Cervezas artesanales locales' },
  { text: 'Ambiente relajado y sofisticado' },
  { text: 'Música en vivo los fines de semana' },
  { text: 'Terraza con vista al mar' },
];

const schedule = [
  { day: 'Lunes - Viernes', time: '7:00 AM - 11:00 PM' },
  { day: 'Sábado', time: '7:00 AM - 12:00 AM' },
  { day: 'Domingo', time: '8:00 AM - 10:00 PM' },
];

/**
 * Componente que muestra la sección de Restaurante & Bar
 * Usa componentes reutilizables y tokens de diseño
 */
const RestaurantBarSection: React.FC = () => {
  return (
    <div className={restaurantSectionContainer}>
      <div className={restaurantContentGrid}>
        {/* Restaurante */}
        <div className="space-y-6 sm:space-y-8">
          <FeatureCard
            icon="🍽️"
            title="Restaurante"
            description="Disfruta de una experiencia culinaria excepcional en nuestro restaurante con vista al mar Caribe."
            features={restaurantFeatures}
          />
          
          <div className={restaurantImageContainer}>
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
              alt="Restaurante del hotel"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bar */}
        <div className="space-y-6 sm:space-y-8">
          <FeatureCard
            icon="🍸"
            title="Bar"
            description="Relájate con una bebida en nuestro bar mientras disfrutas de la brisa del mar y el mejor ambiente."
            features={barFeatures}
          />
          
          <div className={restaurantImageContainer}>
            <Image
              src="https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80"
              alt="Bar del hotel"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Información de Horarios */}
      <div className="max-w-4xl mx-auto mt-12 sm:mt-16 lg:mt-20">
        <div className={restaurantInfoCard}>
          <h3 className={restaurantInfoTitle}>
            Horarios de Atención
          </h3>
          <p className={restaurantInfoText}>
            Estamos disponibles para servirte durante toda la semana. Nuestro equipo está listo para brindarte la mejor experiencia gastronómica.
          </p>
          <div className="mt-6">
            {schedule.map((item, index) => (
              <div key={index} className={restaurantScheduleItem}>
                <span className={restaurantScheduleDay}>{item.day}</span>
                <span className={restaurantScheduleTime}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBarSection;


