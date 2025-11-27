"use client";

import React from 'react';
import AdminPageLayout from '@/components/organisms/AdminPageLayout';
import HabitacionesCRUD from '@/components/organisms/HabitacionesCRUD';

const AdminRoomsPage = () => {
  return (
    <AdminPageLayout
      title="Gestión de Habitaciones"
      subtitle="Administra las habitaciones del hotel"
    >
      <HabitacionesCRUD />
    </AdminPageLayout>
  );
};

export default AdminRoomsPage;

