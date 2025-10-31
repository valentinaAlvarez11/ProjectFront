import React from 'react';
import RoomCardComponent from '@/components/molecules/RoomCardsComponent';

// Datos de ejemplo para las 9 habitaciones (3 filas de 3)
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
    imageUrl: '[https://regattacartagena.com/wp-content/uploads/2022/09/king-estandar.jpg](https://regattacartagena.com/wp-content/uploads/2022/09/king-estandar.jpg)',
  },
  {
    id: 'queen-superior',
    type: 'Queen Superior',
    description: 'Habitación Queen con vista al mar y todas las comodidades de la categoría Superior.',
    imageUrl: '[https://regattacartagena.com/wp-content/uploads/2022/09/queen-superior.jpg](https://regattacartagena.com/wp-content/uploads/2022/09/queen-superior.jpg)',
  },
  {
    id: 'twin-deluxe',
    type: 'Twin Deluxe',
    description: 'Habitación con dos camas Twin y una hermosa vista a la ciudad.',
    imageUrl: '[https://regattacartagena.com/wp-content/uploads/2022/09/twin-deluxe.jpg](https://regattacartagena.com/wp-content/uploads/2022/09/twin-deluxe.jpg)',
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
