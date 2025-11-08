import React from 'react';
import RoomCardComponent from '@/components/molecules/RoomCardsComponent';
import {sampleRooms} from '@/data/roomData';


const RoomCards: React.FC = () => {
  
  const roomCards = sampleRooms.map(room =>({
    id: room.id,
    type: room.roomType,
    description: room.description,
    imageUrl: room.images
  }))
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
