"use client";
// app/(webpage)/home/page
import CarrouselHomepage from "@/components/organisms/CarrouselHomepage";
import RoomCards from "@/components/organisms/ShowRoomCards";
import React from 'react';
import Image from 'next/image';

export default function HomePageClient() {
  return (
    <>
      <CarrouselHomepage />

      {/* Sección de Comodidades */}
      <div className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.3em] text-[#0a174e] mb-6 sm:mb-8 text-center">
          COMODIDADES
        </h2>
        <p className="max-w-5xl text-center text-base sm:text-lg md:text-xl lg:text-2xl text-[#233876] mb-8 sm:mb-12 lg:mb-16 leading-relaxed px-4">
          Hotel Regatta Cartagena está ubicado frente a las playas de Bocagrande, a solo 5 minutos del centro histórico y rodeado de los mejores restaurantes, centros comerciales y discotecas de la ciudad, convirtiéndolo en el lugar ideal no solo para el descanso, sino para pasar grandes momentos de diversión en familia. Somos un hotel con ventilación natural, la brisa proveniente del Mar Caribe nos llevan a respirar con tranquilidad.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16 w-full max-w-6xl">
          {/* Wifi */}
          <div className="flex flex-col items-center w-full sm:w-auto sm:min-w-[250px] lg:min-w-[300px]">
            <Image 
              src="https://static.wixstatic.com/media/820831_5e26e7ba0e6f4da1a4413388c3fc1a36~mv2.png/v1/fill/w_120,h_120,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/free-wifi.png" 
              alt="Wifi" 
              width={100} 
              height={100} 
              className="mb-3 sm:mb-4 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" 
            />
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide text-[#0a174e] mb-4 sm:mb-5">FREE</span>
            <div className="bg-[#0a174e] text-white rounded-full py-3 sm:py-3.5 px-6 sm:px-8 w-full sm:w-[80%] text-center text-sm sm:text-base lg:text-lg font-medium">
              Wifi gratuito
            </div>
          </div>
          {/* Habitaciones familiares */}
          <div className="flex flex-col items-center w-full sm:w-auto sm:min-w-[250px] lg:min-w-[300px]">
            <Image 
              src="https://static.wixstatic.com/media/820831_533e51163b814b2ab51561b825baa86a~mv2.png/v1/fill/w_144,h_144,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/820831_533e51163b814b2ab51561b825baa86a~mv2.png" 
              alt="Habitaciones familiares" 
              width={100} 
              height={100} 
              className="mb-3 sm:mb-4 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" 
            />
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide text-[#0a174e] mb-4 sm:mb-5 invisible">FREE</span>
            <div className="bg-[#0a174e] text-white rounded-full py-3 sm:py-3.5 px-6 sm:px-8 w-full sm:w-[80%] text-center text-sm sm:text-base lg:text-lg font-medium">
              Habitaciones familiares
            </div>
          </div>
          {/* Room service */}
          <div className="flex flex-col items-center w-full sm:w-auto sm:min-w-[250px] lg:min-w-[300px]">
            <Image 
              src="https://static.wixstatic.com/media/820831_ace526efee464b0e957e1ce362f696d3~mv2.png/v1/fill/w_150,h_144,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/820831_ace526efee464b0e957e1ce362f696d3~mv2.png" 
              alt="Room service" 
              width={100} 
              height={100} 
              className="mb-3 sm:mb-4 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" 
            />
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide text-[#0a174e] mb-4 sm:mb-5 invisible">FREE</span>
            <div className="bg-[#0a174e] text-white rounded-full py-3 sm:py-3.5 px-6 sm:px-8 w-full sm:w-[80%] text-center text-sm sm:text-base lg:text-lg font-medium">
              Room service
            </div>
          </div>
        </div>
      </div>
      {/* Sección de habitaciones */}
      <RoomCards />
    </>
  );
}
