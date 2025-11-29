"use client";

import React from 'react';
import { admin } from '@/utils/Tokens';
import { IReservationAdmin } from '@/interfaces/reservations';
import { FaCalendarAlt, FaHotel, FaUser, FaEnvelope } from 'react-icons/fa';
import { formatDate, formatCurrency } from '@/utils/formatters';
import EstadoBadge from '@/components/atoms/EstadoBadge';

interface ReservationRecordCardProps {
  reservation: IReservationAdmin;
}

export default function ReservationRecordCard({
  reservation,
}: ReservationRecordCardProps) {
  return (
    <div className={`${admin.recordCard.container} w-full`}>
      <div className="space-y-3 sm:space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b-2 border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-[#0a174e] to-[#222a54] rounded-lg flex-shrink-0">
              <FaCalendarAlt className="text-white text-base sm:text-xl" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-[#0a174e] truncate">
                Reserva #{reservation.id}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 truncate">
                Habitación {reservation.numero_habitacion}
              </p>
            </div>
          </div>
          <EstadoBadge 
            estado={reservation.estado} 
            tipo="reserva"
            className="flex-shrink-0"
          />
        </div>

        {/* Información */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <div className="p-2 bg-gradient-to-br from-[#b6a253] to-[#d4c373] rounded-lg flex-shrink-0">
              <FaUser className="text-white text-xs sm:text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-semibold uppercase">Cliente</p>
              <p className="text-sm sm:text-base font-medium text-[#0a174e] truncate">
                {reservation.nombre_usuario || 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <div className="p-2 bg-gradient-to-br from-[#0a174e] to-[#222a54] rounded-lg flex-shrink-0">
              <FaEnvelope className="text-white text-xs sm:text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-semibold uppercase">Email</p>
              <p className="text-sm sm:text-base font-medium text-[#0a174e] break-all">
                {reservation.email_usuario || 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <div className="p-2 bg-gradient-to-br from-[#0a174e] to-[#222a54] rounded-lg flex-shrink-0">
              <FaCalendarAlt className="text-white text-xs sm:text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-semibold uppercase">Fechas</p>
              <p className="text-sm sm:text-base font-medium text-[#0a174e]">
                {formatDate(reservation.fecha_inicio)} - {formatDate(reservation.fecha_fin)}
              </p>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <div className="p-2 bg-gradient-to-br from-[#b6a253] to-[#d4c373] rounded-lg flex-shrink-0">
              <FaHotel className="text-white text-xs sm:text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-semibold uppercase">Habitación</p>
              <p className="text-sm sm:text-base font-medium text-[#0a174e]">
                {reservation.numero_habitacion}
              </p>
            </div>
          </div>

          {/* Precio Total */}
          <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-[#0a174e]/10 to-[#222a54]/10 rounded-lg border-l-4 border-[#b6a253] mt-3 sm:mt-4">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Precio Total</p>
              <p className="text-xl sm:text-2xl font-bold text-[#0a174e]">
                {formatCurrency(reservation.precio_total)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
