"use client";

import React from 'react';
import { IUser } from '@/interfaces/users';
import { admin, adminPage, colors, spacing, typography } from '@/utils/Tokens';
import InfoCard from '@/components/molecules/InfoCard';
import RoleBadge from '@/components/atoms/RoleBadge';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaShieldAlt, FaConciergeBell } from 'react-icons/fa';

interface ProfileComponentProps {
  user: IUser;
}

/**
 * Componente de perfil del usuario
 * Muestra información del usuario de forma organizada y bonita
 * Usa componentes reutilizables y tokens de diseño
 */
export default function ProfileComponent({ user }: ProfileComponentProps) {
  const getRoleIcon = (rol: string) => {
    switch (rol) {
      case 'admin':
        return <FaShieldAlt className="text-4xl" />;
      case 'recepcionista':
        return <FaConciergeBell className="text-4xl" />;
      case 'cliente':
        return <FaUser className="text-4xl" />;
      default:
        return <FaUser className="text-4xl" />;
    }
  };

  const getRoleDescription = (rol: string) => {
    switch (rol) {
      case 'admin':
        return 'Tienes acceso completo al sistema de gestión del hotel. Puedes administrar usuarios, habitaciones y reservas.';
      case 'recepcionista':
        return 'Puedes gestionar reservas y servicios del hotel. Tienes acceso al panel de recepción para atender a los huéspedes.';
      case 'cliente':
        return 'Bienvenido a Hotel Regatta. Puedes realizar reservas, consultar servicios y gestionar tu información personal.';
      default:
        return 'Acceso estándar como cliente del hotel.';
    }
  };

  return (
    <div className={adminPage.container}>
      <div className={adminPage.contentWrapper}>
        {/* Header del Perfil */}
        <div className={`${adminPage.headerContainer} mb-6 sm:mb-8`}>
          <div className={adminPage.headerContent}>
            <div className={adminPage.profile.headerLayout}>
              {/* Avatar/Icono */}
              <div className={`${admin.statCard.iconContainer} ${admin.statCard.iconPrimary} shrink-0`}>
                {getRoleIcon(user.rol)}
              </div>
              
              {/* Información Principal */}
              <div className={adminPage.profile.headerTextAlign}>
                <h1 className={`${adminPage.headerTitle} mb-2`}>
                  {user.nombre}
                </h1>
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 mb-2">
                  <RoleBadge rol={user.rol} />
                </div>
                <p className={adminPage.headerSubtitle}>
                  {getRoleDescription(user.rol)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de Información */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card de Información Personal */}
          <InfoCard>
            <div className={adminPage.profile.cardSpacing}>
              <div className={adminPage.profile.cardHeader}>
                <div className={`${admin.statCard.iconContainer} ${adminPage.profile.iconContainerSubtle} shrink-0`}>
                  <FaUser className={adminPage.profile.iconSubtle} />
                </div>
                <h2 className={`${typography.cardTitle} ${adminPage.profile.cardTitle}`}>
                  Información Personal
                </h2>
              </div>
              
              <div className={adminPage.profile.fieldSpacing}>
                <div className={adminPage.profile.fieldRow}>
                  <div className={adminPage.profile.fieldLabelContainer}>
                    <FaUser className={adminPage.profile.fieldIcon} />
                    <span className={adminPage.profile.fieldLabel}>Nombre:</span>
                  </div>
                  <span className={`${typography.body} ${adminPage.profile.fieldValue}`}>
                    {user.nombre}
                  </span>
                </div>
              </div>
            </div>
          </InfoCard>

          {/* Card de Información de Contacto */}
          <InfoCard>
            <div className={adminPage.profile.cardSpacing}>
              <div className={adminPage.profile.cardHeader}>
                <div className={`${admin.statCard.iconContainer} ${adminPage.profile.iconContainerSubtle} shrink-0`}>
                  <FaEnvelope className={adminPage.profile.iconSubtle} />
                </div>
                <h2 className={`${typography.cardTitle} ${adminPage.profile.cardTitle}`}>
                  Información de Contacto
                </h2>
              </div>
              
              <div className={adminPage.profile.fieldSpacing}>
                <div className={adminPage.profile.fieldRow}>
                  <div className={adminPage.profile.fieldLabelContainer}>
                    <FaEnvelope className={adminPage.profile.fieldIcon} />
                    <span className={adminPage.profile.fieldLabel}>Email:</span>
                  </div>
                  <a 
                    href={`mailto:${user.email}`}
                    className={`${typography.body} ${adminPage.profile.fieldLinkBreak}`}
                  >
                    {user.email}
                  </a>
                </div>

                <div className={adminPage.profile.fieldRow}>
                  <div className={adminPage.profile.fieldLabelContainer}>
                    <FaPhone className={adminPage.profile.fieldIcon} />
                    <span className={adminPage.profile.fieldLabel}>Teléfono:</span>
                  </div>
                  <a 
                    href={`tel:${user.telefono}`}
                    className={`${typography.body} ${adminPage.profile.fieldLink}`}
                  >
                    {user.telefono}
                  </a>
                </div>
              </div>
            </div>
          </InfoCard>
        </div>

        {/* Card de Rol y Permisos */}
        <InfoCard className="mt-6 sm:mt-8">
          <div className={adminPage.profile.cardSpacing}>
            <div className={adminPage.profile.cardHeader}>
              <div className={`${admin.statCard.iconContainer} ${adminPage.profile.iconContainerSubtle} shrink-0`}>
                <FaShieldAlt className={adminPage.profile.iconSubtle} />
              </div>
              <h2 className={`${typography.cardTitle} ${adminPage.profile.cardTitle}`}>
                Rol y Permisos
              </h2>
            </div>
            
            <div className={adminPage.profile.fieldSpacing}>
              <div className={adminPage.profile.fieldRow}>
                <div className="flex items-center gap-3">
                  <RoleBadge rol={user.rol} />
                </div>
                <p className={`${typography.body} ${adminPage.profile.fieldText}`}>
                  {getRoleDescription(user.rol)}
                </p>
              </div>

              {/* Notas informativas según el rol */}
              {user.rol === 'admin' && (
                <div className="mt-6 p-4 bg-gradient-to-r from-[#0a1445]/10 to-[#222a54]/10 rounded-lg border-l-4 border-[#b6a253]">
                  <p className={`${typography.body} ${adminPage.profile.fieldText}`}>
                    <strong className={adminPage.profile.fieldTextBold}>Nota:</strong> Como administrador, 
                    tienes acceso completo a todas las funcionalidades del sistema, incluyendo 
                    la gestión de usuarios, habitaciones y reservas.
                  </p>
                </div>
              )}

              {user.rol === 'recepcionista' && (
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-500">
                  <p className={`${typography.body} ${adminPage.profile.fieldText}`}>
                    <strong className={adminPage.profile.fieldTextBold}>Información:</strong> Como recepcionista, 
                    puedes gestionar reservas, consultar disponibilidad de habitaciones y 
                    atender las necesidades de los huéspedes desde el panel de recepción.
                  </p>
                </div>
              )}

              {user.rol === 'cliente' && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-l-4 border-green-500">
                  <p className={`${typography.body} ${adminPage.profile.fieldText}`}>
                    <strong className={adminPage.profile.fieldTextBold}>Bienvenido:</strong> Estamos encantados de tenerte 
                    como huésped. Puedes realizar reservas, consultar nuestros servicios y 
                    disfrutar de todas las comodidades que Hotel Regatta tiene para ofrecerte.
                  </p>
                </div>
              )}
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}

