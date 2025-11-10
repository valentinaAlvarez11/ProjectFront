"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ButtonComponent from '../atoms/ButtonComponent';

interface RoomCardProps {
  id: string;
  type: string;
  description: string;
  imageUrl: string;
}

const RoomCardComponent: React.FC<RoomCardProps> = ({ id, type, description, imageUrl }) => {
  return (
    <Link href={`/room/${id}`} className="no-underline">
      <div className="w-[350px] h-[450px] rounded-xl shadow-lg overflow-hidden relative flex flex-col justify-between items-start text-white text-left p-5 cursor-pointer transition-transform duration-200 hover:scale-105">
        {/* Imagen de fondo */}
        <Image
          src={imageUrl}
          alt={type}
          fill
          className="object-cover z-0"
        />
        {/* Superposición oscura para mejorar la legibilidad del texto */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 via-black/30 to-black/10 z-[1]" />

        {/* Contenido de la tarjeta */}
        <div className="relative z-[2] w-full">
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
      </div>
    </Link>
  );
};

export default RoomCardComponent;
