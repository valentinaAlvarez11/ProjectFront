import React from 'react';
import AmenityCard from '@/components/molecules/AmenityCard';
import { sectionTitle } from '@/utils/Tokens';

export default function ComodidadesSection() {
  return (
    <div className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <h2 className={`${sectionTitle}`}>
        COMODIDADES
      </h2>
      <p className="max-w-5xl text-center text-base sm:text-lg md:text-xl lg:text-2xl text-[#233876] mb-8 sm:mb-12 lg:mb-16 leading-relaxed px-4">
        Hotel Regatta Cartagena está ubicado frente a las playas de Bocagrande, a solo 5 minutos del centro histórico y rodeado de los mejores restaurantes, centros comerciales y discotecas de la ciudad, convirtiéndolo en el lugar ideal no solo para el descanso, sino para pasar grandes momentos de diversión en familia. Somos un hotel con ventilación natural, la brisa proveniente del Mar Caribe nos llevan a respirar con tranquilidad.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16 w-full max-w-6xl">
        <AmenityCard
          imageUrl="https://static.wixstatic.com/media/820831_5e26e7ba0e6f4da1a4413388c3fc1a36~mv2.png/v1/fill/w_120,h_120,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/free-wifi.png"
          imageAlt="Wifi"
          imageWidth={120}
          imageHeight={120}
          showFreeLabel={true}
          title="Wifi gratuito"
        />
        <AmenityCard
          imageUrl="https://static.wixstatic.com/media/820831_533e51163b814b2ab51561b825baa86a~mv2.png/v1/fill/w_144,h_144,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/820831_533e51163b814b2ab51561b825baa86a~mv2.png"
          imageAlt="Habitaciones familiares"
          imageWidth={144}
          imageHeight={144}
          showFreeLabel={false}
          title="Habitaciones familiares"
        />
        <AmenityCard
          imageUrl="https://static.wixstatic.com/media/820831_ace526efee464b0e957e1ce362f696d3~mv2.png/v1/fill/w_150,h_144,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/820831_ace526efee464b0e957e1ce362f696d3~mv2.png"
          imageAlt="Room service"
          imageWidth={150}
          imageHeight={144}
          showFreeLabel={false}
          title="Room service"
        />
      </div>
    </div>
  );
}

