import CarrouselHomepage from "@/components/organisms/CarrouselHomepage";
import RoomCards from "@/components/organisms/ShowRoomCards";
import SectionTitle from "@/components/molecules/SectionTitle";
import FeatureCard from "@/components/molecules/FeatureCard";
import SectionWithImage from "@/components/molecules/SectionWithImage";
import React from 'react';

const features = [
  {
    imageUrl: "https://static.wixstatic.com/media/820831_5e26e7ba0e6f4da1a4413388c3fc1a36~mv2.png/v1/fill/w_120,h_120,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/free-wifi.png",
    imageAlt: "Wifi",
    title: "FREE",
    description: "Wifi gratuito",
    imageWidth: 120,
    imageHeight: 120,
  },
  {
    imageUrl: "https://static.wixstatic.com/media/820831_533e51163b814b2ab51561b825baa86a~mv2.png/v1/fill/w_144,h_144,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/820831_533e51163b814b2ab51561b825baa86a~mv2.png",
    imageAlt: "Habitaciones familiares",
    description: "Habitaciones familiares",
    imageWidth: 144,
    imageHeight: 144,
  },
  {
    imageUrl: "https://static.wixstatic.com/media/820831_ace526efee464b0e957e1ce362f696d3~mv2.png/v1/fill/w_150,h_144,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/820831_ace526efee464b0e957e1ce362f696d3~mv2.png",
    imageAlt: "Room service",
    description: "Room service",
    imageWidth: 150,
    imageHeight: 144,
  },
];

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
