import React from 'react';
import AmenityCard from '@/components/molecules/AmenityCard';
import SectionContainer from '@/components/atoms/SectionContainer';
import SectionTitle from '@/components/atoms/SectionTitle';
import { sections, grids } from '@/utils/Tokens';

export default function ComodidadesSection() {
  return (
    <SectionContainer>
      <div className="flex flex-col items-center">
        <SectionTitle title="COMODIDADES" showLines={false} />
        <p className={sections.subtitle}>
          Hotel Regatta Cartagena está ubicado frente a las playas de Bocagrande, a solo 5 minutos del centro histórico y rodeado de los mejores restaurantes, centros comerciales y discotecas de la ciudad, convirtiéndolo en el lugar ideal no solo para el descanso, sino para pasar grandes momentos de diversión en familia. Somos un hotel con ventilación natural, la brisa proveniente del Mar Caribe nos llevan a respirar con tranquilidad.
        </p>
        <div className={grids.amenities}>
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
    </SectionContainer>
  );
}

