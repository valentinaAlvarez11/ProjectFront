"use client"

import React from 'react';
import Link from 'next/link';

interface RoomCardProps {
  id: string;
  type: string;
  description: string;
  imageUrl: string;
}

const RoomCardComponent: React.FC<RoomCardProps> = ({ id, type, description, imageUrl }) => {
  return (
    <Link href={`/room/${id}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          width: '350px',
          height: '450px',
          background: `url(${imageUrl}) center center / cover no-repeat`,
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          color: '#fff',
          textAlign: 'left',
          padding: '20px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {/* Superposición oscura para mejorar la legibilidad del texto */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
            zIndex: 1,
          }}
        ></div>

        {/* Contenido de la tarjeta */}
        <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div
            style={{
              background: '#0a174e',
              borderRadius: '16px',
              padding: '8px 20px',
              fontWeight: 'bold',
              fontSize: '1.4rem',
              letterSpacing: '0.05em',
              display: 'inline-block',
              marginBottom: '10px',
            }}
          >
            {type}
          </div>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.5 }}>{description}</p>
        </div>

        {/* Botón Ver más */}
        <button
          style={{
            position: 'relative',
            zIndex: 2,
            background: '#E2C044',
            color: '#0a174e',
            border: 'none',
            borderRadius: '30px',
            padding: '12px 28px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            alignSelf: 'center',
            marginTop: '20px',
            transition: 'background 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#ffd700')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#E2C044')}
        >
          Ver más
        </button>
      </div>
    </Link>
  );
};

export default RoomCardComponent;
