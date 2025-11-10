import React from 'react';
import RoomCardComponent from '@/components/molecules/RoomCardsComponent';
import SectionTitle from '@/components/molecules/SectionTitle';

// Datos de ejemplo para las 8 habitaciones
const roomCards = [
  {
    id: 'estandar',
    type: 'Estándar',
    description: 'Cómodas y amplias habitaciones que cuentan con cama King o Twin.',
    imageUrl: 'https://static.wixstatic.com/media/820831_9fe6e39a57a941e2880fdc852413a649~mv2.jpg/v1/fill/w_367,h_473,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_9fe6e39a57a941e2880fdc852413a649~mv2.jpg',
  },
  {
    id: 'superior',
    type: 'Superior',
    description: 'Habitación doble con hermosa vista al mar. Cuenta con cama king size o twin.',
    imageUrl: 'https://static.wixstatic.com/media/820831_bf3684d0cf024ecbbb031eac48129ec1~mv2.jpg/v1/fill/w_367,h_473,al_tl,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_bf3684d0cf024ecbbb031eac48129ec1~mv2.jpg',
  },
  {
    id: 'deluxe',
    type: 'Deluxe',
    description: 'Habitación doble King con hermosa vista a la ciudad. Ideal para parejas.',
    imageUrl: 'https://static.wixstatic.com/media/820831_3a3fd2bc977e431993d2cca2e906f47e~mv2.png/v1/fill/w_367,h_473,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_3a3fd2bc977e431993d2cca2e906f47e~mv2.png',
  },
  {
    id: 'familiar',
    type: 'Familiar',
    description: 'Habitación con dos camas dobles, ideal para familias con niños.',
    imageUrl: 'https://static.wixstatic.com/media/820831_513ee7ccd25e4bad8eb06b0c39516ff7~mv2.jpg/v1/fill/w_367,h_473,al_r,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_513ee7ccd25e4bad8eb06b0c39516ff7~mv2.jpg',
  },
  {
    id: 'suite',
    type: 'Suite',
    description: 'Espaciosa suite con sala de estar, vistas panorámicas y bañera de hidromasaje.',
    imageUrl: 'https://static.wixstatic.com/media/820831_2b32740a67f34c0396bb422ad6eccb01~mv2.jpg/v1/fill/w_367,h_473,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_2b32740a67f34c0396bb422ad6eccb01~mv2.jpg',
  },
  {
    id: 'ejecutiva',
    type: 'Ejecutiva',
    description: 'Diseñada para viajes de negocios, con escritorio de trabajo y comodidades premium.',
    imageUrl: 'https://static.wixstatic.com/media/820831_18d472a3c8824368af61159f79193fe5~mv2.jpg/v1/fill/w_367,h_473,al_r,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_18d472a3c8824368af61159f79193fe5~mv2.jpg',
  },
  {
    id: 'king-estandar',
    type: 'King Estándar',
    description: 'Cama King para una estancia de lujo, perfecta para una o dos personas.',
    imageUrl: 'https://static.wixstatic.com/media/820831_b689c6762b85496fb78228b8ea58f64b~mv2.jpg/v1/fill/w_367,h_473,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_b689c6762b85496fb78228b8ea58f64b~mv2.jpg',
  },
  {
    id: 'queen-superior',
    type: 'Queen Superior',
    description: 'Habitación Queen con vista al mar y todas las comodidades de la categoría Superior.',
    imageUrl: 'https://static.wixstatic.com/media/820831_7e1c695ceff144318c9d098562025a2b~mv2.jpg/v1/fill/w_367,h_473,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_7e1c695ceff144318c9d098562025a2b~mv2.jpg',
  },
];

const RoomCards: React.FC = () => {
  return (
    <div className="w-screen bg-white pb-10 text-center">
      <SectionTitle title="HABITACIONES" />
      <div className="flex justify-center gap-5 flex-wrap max-w-[1200px] mx-auto my-10">
        {roomCards.map((room) => (
          <RoomCardComponent key={room.id} {...room} />
        ))}
      </div>
    </div>
  );
};

export default RoomCards;
