import React from 'react';
import RoomCardComponent from '@/components/molecules/RoomCardsComponent';

// Datos de las 8 habitaciones con IDs reales de la base de datos
// Orden: Estándar(1), Superior(2), Deluxe(3), Deluxe Premium(4), Deluxe con Jacuzzi(5), Junior Suite(6), Suite(7), Suite Premium(8)
const roomCards = [
  {
    id: 1, // Estándar
    type: 'Estándar',
    description: 'Cómodas y amplias habitaciones que cuentan con cama King o Twin.',
    imageUrl: 'https://static.wixstatic.com/media/820831_9fe6e39a57a941e2880fdc852413a649~mv2.jpg/v1/fill/w_367,h_473,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_9fe6e39a57a941e2880fdc852413a649~mv2.jpg',
  },
  {
    id: 2, // Superior
    type: 'Superior',
    description: 'Habitación doble con hermosa vista al mar. Cuenta con cama king size o twin.',
    imageUrl: 'https://static.wixstatic.com/media/820831_bf3684d0cf024ecbbb031eac48129ec1~mv2.jpg/v1/fill/w_367,h_473,al_tl,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_bf3684d0cf024ecbbb031eac48129ec1~mv2.jpg',
  },
  {
    id: 3, // Deluxe
    type: 'Deluxe',
    description: 'Habitación doble King con hermosa vista a la ciudad. Ideal para parejas.',
    imageUrl: 'https://static.wixstatic.com/media/820831_3a3fd2bc977e431993d2cca2e906f47e~mv2.png/v1/fill/w_367,h_473,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_3a3fd2bc977e431993d2cca2e906f47e~mv2.png',
  },
  {
    id: 4, // Deluxe Premium
    type: 'Deluxe Premium',
    description: 'Increíble habitación doble King con hermosa vista al mar. Ideal para parejas. La habitación Deluxe Premium no tiene la opción de separar la cama.',
    imageUrl: 'https://static.wixstatic.com/media/820831_513ee7ccd25e4bad8eb06b0c39516ff7~mv2.jpg/v1/fill/w_367,h_473,al_r,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_513ee7ccd25e4bad8eb06b0c39516ff7~mv2.jpg',
  },
  {
    id: 5, // Deluxe con Jacuzzi
    type: 'Deluxe con Jacuzzi',
    description: 'Habitación de lujo con Jacuzzi, ideal para celebrar fechas especiales. La cama en esta habitación no tiene la opción de separar.',
    imageUrl: 'https://static.wixstatic.com/media/820831_2b32740a67f34c0396bb422ad6eccb01~mv2.jpg/v1/fill/w_367,h_473,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_2b32740a67f34c0396bb422ad6eccb01~mv2.jpg',
  },
  {
    id: 6, // Junior Suite
    type: 'Junior Suite',
    description: 'Amplias habitaciones con capacidad para tres personas, cuenta con cama king size y una cama sencilla con vista lateral al mar o a la ciudad.',
    imageUrl: 'https://static.wixstatic.com/media/820831_18d472a3c8824368af61159f79193fe5~mv2.jpg/v1/fill/w_367,h_473,al_r,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_18d472a3c8824368af61159f79193fe5~mv2.jpg',
  },
  {
    id: 7, // Suite
    type: 'Suite',
    description: 'Habitación cuádruple. Cuenta con 2 camas sencillas y una doble. 1 baño.',
    imageUrl: 'https://static.wixstatic.com/media/820831_b689c6762b85496fb78228b8ea58f64b~mv2.jpg/v1/fill/w_367,h_473,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_b689c6762b85496fb78228b8ea58f64b~mv2.jpg',
  },
  {
    id: 8, // Suite Premium
    type: 'Suite Premium',
    description: 'Habitación cuádruple. Cuenta con dos ambientes o dos habitaciones comunicadas con cama King o twins y vista al mar o la ciudad. 2 baños.',
    imageUrl: 'https://static.wixstatic.com/media/820831_7e1c695ceff144318c9d098562025a2b~mv2.jpg/v1/fill/w_367,h_473,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_7e1c695ceff144318c9d098562025a2b~mv2.jpg',
  },
];

const RoomCards: React.FC = () => {
  return (
    <div style={{ width: '100vw', background: '#fff', padding: '60px 0 40px 0', textAlign: 'center' }}>
      <div style={{ width: '90vw', margin: '0 auto 32px auto' }}>
        <hr style={{ border: 'none', borderTop: '4px solid #0a174e', marginBottom: '2px' }} />
        <hr style={{ border: 'none', borderTop: '2px solid #0a174e', marginTop: '0' }} />
      </div>
      <h2
        style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          letterSpacing: '0.3em',
          color: '#0a174e',
          margin: '32px 0 0 0',
        }}
      >
        HABITACIONES
      </h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '40px auto 60px auto',
        }}
      >
        {roomCards.map((room) => (
          <RoomCardComponent key={room.id} {...room} />
        ))}
      </div>
    </div>
  );
};

export default RoomCards;
