"use client";

import React from 'react';
import AdminPageLayout from '@/components/organisms/AdminPageLayout';
import RecepcionistasCRUD from '@/components/organisms/RecepcionistasCRUD';

const AdminRecepcionistasPage = () => {
  return (
    <AdminPageLayout
      title="Gestión de Recepcionistas"
      subtitle="Administra los recepcionistas del hotel"
    >
      <RecepcionistasCRUD />
    </AdminPageLayout>
  );
};

export default AdminRecepcionistasPage;

