"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
<<<<<<< HEAD
=======
import ButtonComponent from '../atoms/ButtonComponent';
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a

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
<<<<<<< HEAD
      <div className="
        w-full max-w-[350px] 
        h-[400px] sm:h-[450px] 
        rounded-xl 
        shadow-lg 
        overflow-hidden 
        relative 
        flex 
        flex-col 
        justify-between 
        items-start 
        text-white 
        text-left 
        p-4 sm:p-5 
        cursor-pointer 
        transition-transform 
        duration-200 
        ease-in-out
        hover:scale-[1.03]
        mx-auto
      ">
        {/* Imagen de fondo */}
        {hasValidImage ? (
          <Image
            src={validImageUrl}
            alt={type}
            fill
            className="object-cover z-0"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 z-0" />
        )}
        
=======
      <div className="w-[350px] h-[450px] rounded-xl shadow-lg overflow-hidden relative flex flex-col justify-between items-start text-white text-left p-5 cursor-pointer transition-transform duration-200 hover:scale-105">
        {/* Imagen de fondo */}
        <Image
          src={imageUrl}
          alt={type}
          fill
          className="object-cover z-0"
        />
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a
        {/* Superposición oscura para mejorar la legibilidad del texto */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 via-black/30 to-black/10 z-[1]" />

        {/* Contenido de la tarjeta */}
        <div className="relative z-[2] w-full">
<<<<<<< HEAD
          <div className="
            bg-[#0a174e] 
            rounded-2xl 
            px-4 sm:px-5 
            py-2 
            font-bold 
            text-lg sm:text-xl 
            tracking-wide 
            inline-block 
            mb-2 sm:mb-3
          ">
            {type}
          </div>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed line-clamp-3 sm:line-clamp-4">
            {description}
          </p>
        </div>

        {/* Botón Ver más */}
        <button
          className="
            relative 
            z-[2] 
            bg-[#E2C044] 
            hover:bg-[#ffd700] 
            text-[#0a174e] 
            border-none 
            rounded-full 
            px-5 sm:px-7 
            py-2.5 sm:py-3 
            text-sm sm:text-base 
            font-bold 
            cursor-pointer 
            self-center 
            mt-4 sm:mt-5 
            transition-colors 
            duration-200 
            ease-in-out
            focus:outline-none 
            focus:ring-2 
            focus:ring-[#E2C044] 
            focus:ring-offset-2
          "
        >
          Ver más
        </button>
=======
          <div className="bg-[#0a174e] rounded-2xl px-5 py-2 font-bold text-[1.4rem] tracking-wider inline-block mb-2.5">
            {type}
          </div>
          <p className="text-[1.1rem] leading-relaxed">{description}</p>
        </div>

        {/* Botón Ver más */}
        <div className="relative z-[2] self-center mt-5">
          <ButtonComponent
            variant="primary"
            className="bg-[#E2C044] hover:bg-[#ffd700] text-[#0a174e] rounded-[30px] px-7 py-3 text-[1.1rem] font-bold"
          >
            Ver más
          </ButtonComponent>
        </div>
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a
      </div>
    </Link>
  );
};

export default RoomCardComponent;
