"use client";

import React, { useEffect, useState } from 'react';
import UsersService from '@/libs/users.service';
import { IUser } from '@/interfaces/users';
import RecepcionistaForm from '@/components/molecules/RecepcionistaForm';
import Modal from '@/components/atoms/Modal';
import Button from '@/components/atoms/ButtonAuth';
import ConfirmDeleteModal from '@/components/molecules/ConfirmDeleteModal';
import SuccessModal from '@/components/molecules/SuccessModal';
import ErrorAlert from '@/components/molecules/ErrorAlert';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import { useModal } from '@/hooks/useModal';
import { adminPage, colors } from '@/utils/Tokens';

export default function RecepcionistasCRUD() {
  const [recepcionistas, setRecepcionistas] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecepcionista, setEditingRecepcionista] = useState<IUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingRecepcionistaId, setDeletingRecepcionistaId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  // Hooks para manejar los modales
  const deleteModal = useModal();
  const successModal = useModal();

  useEffect(() => {
    loadRecepcionistas();
  }, []);

  const loadRecepcionistas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await UsersService.getAllUsersAdmin();
      // Filtrar solo recepcionistas
      const recepcionistasList = response.usuarios.filter(
        (user) => user.rol === 'recepcionista'
      );
      setRecepcionistas(recepcionistasList);
    } catch (err: any) {
      console.error('Error al cargar recepcionistas:', err);
      setError(err?.message || 'Error al cargar los recepcionistas');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingRecepcionista(null);
    setIsModalOpen(true);
  };

  const handleEdit = (recepcionista: IUser) => {
    setEditingRecepcionista(recepcionista);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingRecepcionistaId(id);
    deleteModal.open();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingRecepcionistaId) return;

    try {
      setIsDeleting(true);
      await UsersService.deleteUserAdmin(deletingRecepcionistaId);
      deleteModal.close();
      setDeletingRecepcionistaId(null);
      loadRecepcionistas();
    } catch (err: any) {
      console.error('Error al eliminar recepcionista:', err);
      setError(err?.message || 'Error al eliminar el recepcionista');
      // No cerramos el modal si hay error, para que el usuario pueda intentar de nuevo
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (editingRecepcionista) {
        // Actualizar
        await UsersService.updateUserAdmin(editingRecepcionista.id, {
          ...data,
          rol: 'recepcionista',
        });
        setSuccessMessage('Recepcionista actualizado exitosamente');
      } else {
        // Crear
        await UsersService.register({
          ...data,
          rol: 'recepcionista',
        });
        setSuccessMessage('Recepcionista creado exitosamente');
      }

      setIsModalOpen(false);
      setEditingRecepcionista(null);
      successModal.open();
      loadRecepcionistas();
    } catch (err: any) {
      console.error('Error al guardar recepcionista:', err);
      setError(err?.message || 'Error al guardar el recepcionista');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <LoadingSpinner 
        size="md" 
        message="Cargando recepcionistas..." 
        className="p-8"
      />
    );
  }

  return (
    <div className={adminPage.crudContainer}>
      <div className={adminPage.crudHeader}>
        <div>
          <h2 className={adminPage.crudTitle}>
            Gestión de Recepcionistas
          </h2>
          <p className={adminPage.crudSubtitle}>
            Administra los recepcionistas del hotel
          </p>
        </div>
        <Button
          onClick={handleCreate}
          variant="primary"
          className="w-full sm:w-auto"
        >
          + Crear Recepcionista
        </Button>
      </div>

      {error && (
        <ErrorAlert 
          message={error} 
          onClose={() => setError(null)}
        />
      )}

      {recepcionistas.length === 0 ? (
        <div className={adminPage.emptyState}>
          <p className={adminPage.emptyStateText}>No hay recepcionistas registrados</p>
        </div>
      ) : (
        <div className={adminPage.tableWrapper}>
          <table className={adminPage.table}>
            <thead className={adminPage.tableHeader}>
              <tr>
                <th className={adminPage.tableHeaderCell}>
                  ID
                </th>
                <th className={adminPage.tableHeaderCell}>
                  Nombre
                </th>
                <th className={adminPage.tableHeaderCell}>
                  Email
                </th>
                <th className={adminPage.tableHeaderCell}>
                  Teléfono
                </th>
                <th className={adminPage.tableHeaderCell}>
                  Rol
                </th>
                <th className={adminPage.tableHeaderCellRight}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className={adminPage.tableRow}>
              {recepcionistas.map((recepcionista) => (
                <tr key={recepcionista.id} className="hover:bg-gray-50">
                  <td className={adminPage.tableCell}>
                    {recepcionista.id}
                  </td>
                  <td className={adminPage.tableCellMedium}>
                    {recepcionista.nombre}
                  </td>
                  <td className={adminPage.tableCellMuted}>
                    {recepcionista.email}
                  </td>
                  <td className={adminPage.tableCellMuted}>
                    {recepcionista.telefono}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {recepcionista.rol}
                    </span>
                  </td>
                  <td className={adminPage.tableCellActions}>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(recepcionista)}
                        className={adminPage.actionButton}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteClick(recepcionista.id)}
                        className={adminPage.deleteButton}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRecepcionista(null);
          setError(null);
        }}
        title={editingRecepcionista ? 'Editar Recepcionista' : 'Crear Recepcionista'}
      >
        <RecepcionistaForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingRecepcionista(null);
            setError(null);
          }}
          initialData={editingRecepcionista ? {
            email: editingRecepcionista.email,
            telefono: editingRecepcionista.telefono,
            nombre: editingRecepcionista.nombre,
          } : undefined}
          isEditing={!!editingRecepcionista}
          isLoading={isSubmitting}
        />
        {error && (
          <div className="mt-4 bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => {
          deleteModal.close();
          setDeletingRecepcionistaId(null);
          setError(null);
        }}
        onConfirm={handleDeleteConfirm}
        itemName={deletingRecepcionistaId ? recepcionistas.find(r => r.id === deletingRecepcionistaId)?.nombre || '' : ''}
        itemType="recepcionista"
        isLoading={isDeleting}
      />

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={successModal.close}
        title={editingRecepcionista ? "Recepcionista Actualizado" : "Recepcionista Creado"}
        message={successMessage}
      />
    </div>
  );
}
