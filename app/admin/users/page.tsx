"use client";

import React from 'react';
import AdminPageLayout from '@/components/organisms/AdminPageLayout';
import UsuariosCRUD from '@/components/organisms/UsuariosCRUD';

const AdminUsersPage = () => {
  return (
    <AdminPageLayout
      title="Gestión de Usuarios"
      subtitle="Administra todos los usuarios del sistema"
    >
      <UsuariosCRUD />
    </AdminPageLayout>
  );
};

export default AdminUsersPage;

