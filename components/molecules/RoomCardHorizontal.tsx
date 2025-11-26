"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IRoom } from '@/interfaces/rooms';

interface RoomCardHorizontalProps {
  room: IRoom;
}

const RoomCardHorizontal: React.FC<RoomCardHorizontalProps> = ({ room }) => {
  // Validar y normalizar URL de imagen
  const getValidImageUrl = (url: string): string | null => {
    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/')) return url;
    return null;
  };

  // Obtener la primera imagen válida
  const getRoomImage = (): string => {
    if (room.imagenes && room.imagenes.length > 0) {
      const firstImage = room.imagenes[0];
      if (firstImage && (firstImage.startsWith('http://') || firstImage.startsWith('https://'))) {
        return firstImage;
      }
    }
    // Imagen por defecto si no hay imagen válida
    return 'https://static.wixstatic.com/media/820831_9fe6e39a57a941e2880fdc852413a649~mv2.jpg/v1/fill/w_367,h_473,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_9fe6e39a57a941e2880fdc852413a649~mv2.jpg';
  };

  const imageUrl = getRoomImage();
  const validImageUrl = getValidImageUrl(imageUrl);
  const hasValidImage = validImageUrl !== null;

  // Obtener descripción
  const getRoomDescription = (): string => {
    if (room.descripcion) {
      return room.descripcion;
    }
    return `Habitación ${room.tipo} cómoda y acogedora.`;
  };

  // Obtener características principales
  const getMainFeatures = (): string[] => {
    const features: string[] = [];
    
    if (room.caracteristicas) {
      if (typeof room.caracteristicas === 'object' && !Array.isArray(room.caracteristicas)) {
        if (room.caracteristicas.tamano) {
          features.push(room.caracteristicas.tamano);
        }
        if (room.caracteristicas.camas) {
          features.push(room.caracteristicas.camas);
        }
        if (room.caracteristicas.vista) {
          features.push(room.caracteristicas.vista);
        }
      }
    }
    
    return features;
  };

  const mainFeatures = getMainFeatures();
  const description = getRoomDescription();

  // Formatear precio
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/room/${room.id}`} className="no-underline block">
      <div className="
        w-full
        flex
        flex-col
        sm:flex-row
        rounded-lg
        shadow-md
        overflow-hidden
        bg-white
        hover:shadow-xl
        transition-shadow
        duration-200
        ease-in-out
        border
        border-gray-200
      ">
        {/* Imagen a la izquierda */}
        <div className="
          w-full
          sm:w-[40%]
          lg:w-[35%]
          h-[250px]
          sm:h-[300px]
          lg:h-[280px]
          relative
          flex-shrink-0
        ">
          {hasValidImage ? (
            <Image
              src={validImageUrl}
              alt={room.tipo}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 40vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600" />
          )}
        </div>

        {/* Información a la derecha */}
        <div className="
          flex-1
          p-6
          sm:p-8
          flex
          flex-col
          justify-between
        ">
          {/* Tipo y precio */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <div className="
                bg-[#0a174e]
                text-white
                rounded-lg
                px-4
                py-2
                font-bold
                text-lg
                sm:text-xl
                tracking-wide
                inline-block
                w-fit
              ">
                {room.tipo}
              </div>
              <div className="
                text-[#0a174e]
                font-bold
                text-xl
                sm:text-2xl
              ">
                {formatPrice(room.precio_noche)} <span className="text-base sm:text-lg font-normal text-gray-600">/ noche</span>
              </div>
            </div>

            {/* Descripción */}
            <p className="
              text-gray-700
              text-sm
              sm:text-base
              leading-relaxed
              mb-4
              line-clamp-3
              sm:line-clamp-4
            ">
              {description}
            </p>

            {/* Características principales */}
            {mainFeatures.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {mainFeatures.map((feature, index) => (
                  <span
                    key={index}
                    className="
                      bg-gray-100
                      text-gray-700
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      sm:text-sm
                      font-medium
                    "
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Botón Ver más */}
          <div className="mt-4">
            <button
              className="
                bg-[#E2C044]
                hover:bg-[#ffd700]
                text-[#0a174e]
                border-none
                rounded-full
                px-6
                sm:px-8
                py-2.5
                sm:py-3
                text-sm
                sm:text-base
                font-bold
                cursor-pointer
                transition-colors
                duration-200
                ease-in-out
                focus:outline-none
                focus:ring-2
                focus:ring-[#E2C044]
                focus:ring-offset-2
                w-full
                sm:w-auto
              "
            >
              Ver más
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomCardHorizontal;

