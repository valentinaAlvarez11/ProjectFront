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
      <div className="w-screen bg-white py-16 flex flex-col items-center">
        <SectionTitle
          title="COMODIDADES"
          subtitle="Hotel Regatta Cartagena está ubicado frente a las playas de Bocagrande, a solo 5 minutos del centro histórico y rodeado de los mejores restaurantes, centros comerciales y discotecas de la ciudad, convirtiéndolo en el lugar ideal no solo para el descanso, sino para pasar grandes momentos de diversión en familia. Somos un hotel con ventilación natural, la brisa proveniente del Mar Caribe nos llevan a respirar con tranquilidad."
        />
        <div className="flex justify-center gap-16 flex-wrap">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Sección Hotel Regatta cuida de ti */}
      <SectionWithImage
        title="Hotel Regatta cuida de ti"
        description="Nos esforzamos para que vivas una experiencia única y de ensueño al estar frente a las playas de Bocagrande, por eso ponemos toda nuestra atención en el cuidado hacia ti y cumplimos con un estricto protocolo una vez ingresas a nuestro hotel."
        imageUrl="https://static.wixstatic.com/media/820831_c7cbafe210a64f37aa1362a9a0df7435~mv2.jpg/v1/fill/w_881,h_455,al_tr,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_c7cbafe210a64f37aa1362a9a0df7435~mv2.jpg"
        imageAlt="Hotel Regatta cuida de ti"
        imagePosition="right"
      />

      {/* Sección de habitaciones */}
      <RoomCards />
    </>
  );
}
