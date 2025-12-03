"use client";

import React from 'react';
import { useAdminRegistros } from '@/hooks/useAdminRegistros';
import AdminRegistrosContent from '@/components/organisms/AdminRegistrosContent';

export default function AdminRegistrosPage() {
  const {
    loadingAuth,
    loading,
    loadingPayments,
    error,
    errorPayments,
    isLoggedIn,
    user,
    canAccess,
    isLoading,
    reservations,
    payments,
    filteredReservations,
    filteredPayments,
    statsReservas,
    statsPagos,
    activeTab,
    setActiveTab,
    filterEstado,
    setFilterEstado,
    filterEstadoPagos,
    setFilterEstadoPagos,
    searchTerm,
    setSearchTerm,
    searchTermPagos,
    setSearchTermPagos,
    handleCloseError,
    handleCloseErrorPayments,
  } = useAdminRegistros();

  return (
    <AdminRegistrosContent
      loadingAuth={loadingAuth}
      loading={loading}
      loadingPayments={loadingPayments}
      error={error}
      errorPayments={errorPayments}
      isLoggedIn={isLoggedIn}
      user={user}
      canAccess={canAccess}
      isLoading={isLoading}
      reservations={reservations}
      payments={payments}
      filteredReservations={filteredReservations}
      filteredPayments={filteredPayments}
      statsReservas={statsReservas}
      statsPagos={statsPagos}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      filterEstado={filterEstado}
      setFilterEstado={setFilterEstado}
      filterEstadoPagos={filterEstadoPagos}
      setFilterEstadoPagos={setFilterEstadoPagos}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchTermPagos={searchTermPagos}
      setSearchTermPagos={setSearchTermPagos}
      onCloseError={handleCloseError}
      onCloseErrorPayments={handleCloseErrorPayments}
    />
  );
}
