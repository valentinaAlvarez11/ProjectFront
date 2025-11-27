"use client";

import React, { useEffect, useState } from 'react';
import RoomsService from '@/libs/rooms.service';
import ReservationsService from '@/libs/reservations.service';
import { IRoom } from '@/interfaces/rooms';
import { IReservationAdmin } from '@/interfaces/reservations';
import SectionContainer from '@/components/atoms/SectionContainer';
import SectionTitle from '@/components/atoms/SectionTitle';
import LoadingState from '@/components/atoms/LoadingState';
import ErrorState from '@/components/atoms/ErrorState';
import StatCard from '@/components/molecules/StatCard';
import QuickActionCard from '@/components/molecules/QuickActionCard';
import InfoCard from '@/components/molecules/InfoCard';
import { admin, grids } from '@/utils/Tokens';

interface HotelStats {
  totalRooms: number;
  availableRooms: number;
  unavailableRooms: number;
}

export default function AdminHome() {
  const [stats, setStats] = useState<HotelStats>({
    totalRooms: 0,
    availableRooms: 0,
    unavailableRooms: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Cargar habitaciones y reservas en paralelo
      const [roomsResponse, reservationsResponse] = await Promise.all([
        RoomsService.getAllAdmin(),
        ReservationsService.getAllAdmin(),
      ]);
      
      const rooms: IRoom[] = roomsResponse.habitaciones;
      const reservations: IReservationAdmin[] = reservationsResponse.reservas;
      
      // Filtrar TODAS las reservas confirmadas (sin importar fechas)
      const confirmedReservations = reservations.filter(reservation => {
        return reservation.estado === 'confirmada';
      });
      
      // Obtener IDs de habitaciones con reservas confirmadas
      const roomsWithConfirmedReservations = new Set(
        confirmedReservations.map(res => res.habitacionId)
      );
      
      // Calcular estadísticas
      const total = rooms.length;
      
      // Una habitación está disponible si:
      // 1. Tiene disponible = true en la BD
      // 2. NO tiene una reserva confirmada (activa o futura)
      const available = rooms.filter(room => {
        const isRoomAvailableInDB = room.disponible === true || room.disponible === 1;
        const hasConfirmedReservation = roomsWithConfirmedReservations.has(room.id);
        return isRoomAvailableInDB && !hasConfirmedReservation;
      }).length;
      
      // Una habitación NO está disponible si:
      // 1. Tiene disponible = false en la BD, O
      // 2. Tiene una reserva confirmada (activa o futura)
      const unavailable = rooms.filter(room => {
        const isRoomUnavailableInDB = room.disponible === false || room.disponible === 0;
        const hasConfirmedReservation = roomsWithConfirmedReservations.has(room.id);
        return isRoomUnavailableInDB || hasConfirmedReservation;
      }).length;

      setStats({
        totalRooms: total,
        availableRooms: available,
        unavailableRooms: unavailable,
      });
    } catch (err: any) {
      console.error('Error al cargar estadísticas:', err);
      setError('Error al cargar las estadísticas del hotel');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState message="Cargando información del hotel..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  const quickActions = [
    {
      title: 'Gestionar Habitaciones',
      description: 'Crear, editar y eliminar habitaciones',
      icon: '🏨',
      href: '/admin/dashboard',
      variant: 'primary' as const,
    },
    {
      title: 'Gestionar Recepcionistas',
      description: 'Administrar personal de recepción',
      icon: '👥',
      href: '/admin/dashboard',
      variant: 'secondary' as const,
    },
    {
      title: 'Ver Reservas',
      description: 'Revisar y gestionar reservas',
      icon: '📅',
      href: '/reservas',
      variant: 'dark' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <SectionContainer className={admin.hero.container}>
        <div className={admin.hero.content}>
          <h1 className={admin.hero.title}>
            Bienvenido, Administrador
          </h1>
          <p className={admin.hero.subtitle}>
            Panel de control del Hotel Regatta Cartagena
          </p>
        </div>
      </SectionContainer>

      {/* Statistics Section */}
      <SectionContainer>
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="ESTADÍSTICAS DEL HOTEL" showLines={false} />
          <div className={grids.stats}>
            <StatCard
              title="Total Habitaciones"
              value={stats.totalRooms}
              icon="🏨"
              variant="primary"
            />
            <StatCard
              title="Disponibles"
              value={stats.availableRooms}
              icon="✅"
              variant="success"
            />
            <StatCard
              title="No Disponibles"
              value={stats.unavailableRooms}
              icon="❌"
              variant="error"
            />
          </div>
        </div>
      </SectionContainer>

      {/* Quick Actions Section */}
      <SectionContainer background="gray">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="ACCIONES RÁPIDAS" showLines={false} />
          <div className={grids.quickActions}>
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action.title}
                description={action.description}
                icon={action.icon}
                href={action.href}
                variant={action.variant}
              />
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Information Section */}
      <SectionContainer>
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle title="INFORMACIÓN DEL HOTEL" showLines={false} />
          <InfoCard>
            <p className={`${admin.infoCard.text} mb-6`}>
              Hotel Regatta Cartagena está ubicado frente a las playas de Bocagrande, 
              a solo 5 minutos del centro histórico y rodeado de los mejores restaurantes, 
              centros comerciales y discotecas de la ciudad.
            </p>
            <p className={admin.infoCard.text}>
              Como administrador, tienes acceso completo a la gestión de habitaciones, 
              recepcionistas y todas las funcionalidades del sistema.
            </p>
          </InfoCard>
        </div>
      </SectionContainer>
    </div>
  );
}

