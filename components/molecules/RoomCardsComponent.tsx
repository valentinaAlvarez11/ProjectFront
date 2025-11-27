"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import { cards, colors, typography, spacing } from '@/utils/Tokens';

interface RoomCardProps {
  id: number;
  type: string;
  description: string;
  imageUrl: string;
}

const RoomCardComponent: React.FC<RoomCardProps> = ({ id, type, description, imageUrl }) => {
  // Validar y normalizar URL de imagen
  const getValidImageUrl = (url: string): string | null => {
    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/')) return url;
    return null;
  };

  const validImageUrl = getValidImageUrl(imageUrl);
  const hasValidImage = validImageUrl !== null;

  return (
    <Link href={`/room/${id}`} className="no-underline">
      <div className={cards.roomCard}>
        {/* Imagen de fondo */}
        {hasValidImage ? (
          <Image
            src={validImageUrl}
            alt={type}
            fill
            className="object-cover z-0"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 z-0" />
        )}
        
        {/* Superposición oscura para mejorar la legibilidad del texto */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 via-black/30 to-black/10 z-[1]" />

        {/* Contenido de la tarjeta */}
        <div className="relative z-[2] w-full">
          <div className={`bg-[#0a174e] rounded-2xl px-4 sm:px-5 py-2 font-bold ${typography.cardTitle} tracking-wide inline-block mb-2 sm:mb-3`}>
            {type}
          </div>
          <p className={`${typography.body} ${typography.bodyLarge} leading-relaxed line-clamp-3 sm:line-clamp-4`}>
            {description}
          </p>
        </div>

        {/* Botón Ver más */}
        <div className="relative z-[2] self-center mt-4 sm:mt-5">
          <Button variant="primary">
            Ver más
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default RoomCardComponent;
