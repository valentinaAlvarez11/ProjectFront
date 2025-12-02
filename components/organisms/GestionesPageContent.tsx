"use client";

import React from 'react';
import LoadingState from '@/components/atoms/LoadingState';
import { adminPage } from '@/utils/Tokens';
import InfoCard from '@/components/molecules/InfoCard';
import { FaCalendarAlt, FaBed, FaUser, FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useGestiones } from '@/hooks/useGestiones';

export default function GestionesPageContent() {
  const { isLoading, canAccess } = useGestiones();

  if (isLoading) {
    return <LoadingState message="Cargando..." />;
  }

  if (!canAccess) {
    return null;
  }

  return (
    <div className={adminPage.container}>
      <div className={adminPage.contentWrapper}>
        {/* Header */}
        <div className={`${adminPage.headerContainer} mb-6 sm:mb-8`}>
          <div className={adminPage.headerContent}>
            <h1 className={adminPage.headerTitle}>
              Mis Gestiones
            </h1>
            <p className={adminPage.headerSubtitle}>
              Administra tus reservas y servicios del hotel
            </p>
          </div>
        </div>

        {/* Cards de Acciones Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <InfoCard className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-[#b6a253]">
            <Link href="/mis-reservas" className="block">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#0a174e] to-[#222a54] rounded-full flex items-center justify-center text-4xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FaCalendarAlt />
                </div>
                <h3 className="text-xl font-bold text-[#0a174e] group-hover:text-[#b6a253] transition-colors">
                  Mis Reservas
                </h3>
                <p className="text-gray-600 text-sm">
                  Consulta y gestiona todas tus reservas
                </p>
              </div>
            </Link>
          </InfoCard>

          <InfoCard className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-[#b6a253]">
            <Link href="/nueva-reserva" className="block">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#b6a253] to-[#d4c373] rounded-full flex items-center justify-center text-4xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FaBed />
                </div>
                <h3 className="text-xl font-bold text-[#0a174e] group-hover:text-[#b6a253] transition-colors">
                  Nueva Reserva
                </h3>
                <p className="text-gray-600 text-sm">
                  Crea una nueva reserva de habitación
                </p>
              </div>
            </Link>
          </InfoCard>

          <InfoCard className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-[#b6a253]">
            <Link href="/perfil" className="block">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#0a174e] to-[#222a54] rounded-full flex items-center justify-center text-4xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FaUser />
                </div>
                <h3 className="text-xl font-bold text-[#0a174e] group-hover:text-[#b6a253] transition-colors">
                  Mi Perfil
                </h3>
                <p className="text-gray-600 text-sm">
                  Gestiona tu información personal
                </p>
              </div>
            </Link>
          </InfoCard>
        </div>

        {/* Información Adicional */}
        <InfoCard className="mt-6 sm:mt-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-[#b6a253]/20 to-[#d4c373]/20 rounded-lg">
              <FaInfoCircle className="text-[#b6a253] text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0a174e] mb-2">
                Información Importante
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Desde aquí puedes gestionar todas tus reservas, crear nuevas reservas 
                y acceder a tu perfil. Si necesitas ayuda, no dudes en contactarnos.
              </p>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}

