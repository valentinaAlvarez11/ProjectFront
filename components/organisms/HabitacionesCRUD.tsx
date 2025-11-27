"use client";

import React, { useEffect, useState } from 'react';
import RoomsService from '@/libs/rooms.service';
import { IRoom } from '@/interfaces/rooms';
import Modal from '@/components/atoms/Modal';
import Button from '@/components/atoms/ButtonAuth';
import CreateRoomForm from '@/components/molecules/CreateRoomForm';
import ConfirmDeleteModal from '@/components/molecules/ConfirmDeleteModal';
import ErrorAlert from '@/components/molecules/ErrorAlert';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import { useModal } from '@/hooks/useModal';
import { adminPage } from '@/utils/Tokens';

export default function HabitacionesCRUD() {
  const [habitaciones, setHabitaciones] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingHabitacion, setEditingHabitacion] = useState<IRoom | null>(null);
  const [loadingHabitacion, setLoadingHabitacion] = useState(false);
  const [deletingHabitacionId, setDeletingHabitacionId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Hook para manejar el modal de confirmación de eliminación
  const deleteModal = useModal();

  useEffect(() => {
    loadHabitaciones();
  }, []);

  const loadHabitaciones = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await RoomsService.getAllAdmin();
      setHabitaciones(response.habitaciones);
    } catch (err: any) {
      console.error('Error al cargar habitaciones:', err);
      setError(err?.message || 'Error al cargar las habitaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = async (id: number) => {
    try {
      setLoadingHabitacion(true);
      setError(null);
      const response = await RoomsService.getByIdPublic(id);
      setEditingHabitacion(response.habitacion);
      setIsEditModalOpen(true);
    } catch (err: any) {
      console.error('Error al cargar habitación:', err);
      setError(err?.message || 'Error al cargar la habitación');
    } finally {
      setLoadingHabitacion(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeletingHabitacionId(id);
    deleteModal.open();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingHabitacionId) return;

    try {
      setIsDeleting(true);
      await RoomsService.deleteRoom(deletingHabitacionId);
      deleteModal.close();
      setDeletingHabitacionId(null);
      loadHabitaciones();
    } catch (err: any) {
      console.error('Error al eliminar habitación:', err);
      setError(err?.message || 'Error al eliminar la habitación');
      // No cerramos el modal si hay error, para que el usuario pueda intentar de nuevo
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
    loadHabitaciones();
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setEditingHabitacion(null);
    loadHabitaciones();
  };

  if (loading) {
    return (
      <LoadingSpinner 
        size="md" 
        message="Cargando habitaciones..." 
        className="p-8"
      />
    );
  }

  return (
    <div className={adminPage.crudContainer}>
      <div className={adminPage.crudHeader}>
        <div>
          <h2 className={adminPage.crudTitle}>
            Gestión de Habitaciones
          </h2>
          <p className={adminPage.crudSubtitle}>
            Administra las habitaciones del hotel
          </p>
        </div>
        <Button
          onClick={handleCreate}
          variant="primary"
          className="w-full sm:w-auto"
        >
          + Crear Habitación
        </Button>
      </div>

      {error && (
        <ErrorAlert 
          message={error} 
          onClose={() => setError(null)}
        />
      )}

      {habitaciones.length === 0 ? (
        <div className={adminPage.emptyState}>
          <p className={adminPage.emptyStateText}>No hay habitaciones registradas</p>
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
                  Número
                </th>
                <th className={adminPage.tableHeaderCell}>
                  Tipo
                </th>
                <th className={adminPage.tableHeaderCell}>
                  Precio/Noche
                </th>
                <th className={adminPage.tableHeaderCell}>
                  Disponible
                </th>
                <th className={adminPage.tableHeaderCell}>
                  Descripción
                </th>
                <th className={adminPage.tableHeaderCellRight}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className={adminPage.tableRow}>
              {habitaciones.map((habitacion) => (
                <tr key={habitacion.id} className="hover:bg-gray-50">
                  <td className={adminPage.tableCell}>
                    {habitacion.id}
                  </td>
                  <td className={adminPage.tableCellMedium}>
                    {habitacion.numero}
                  </td>
                  <td className={adminPage.tableCellMuted}>
                    {habitacion.tipo}
                  </td>
                  <td className={adminPage.tableCellMuted}>
                    ${habitacion.precio_noche.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        habitacion.disponible
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {habitacion.disponible ? 'Disponible' : 'No disponible'}
                    </span>
                  </td>
                  <td className={`${adminPage.tableCellMuted} max-w-xs truncate`}>
                    {habitacion.descripcion || 'Sin descripción'}
                  </td>
                  <td className={adminPage.tableCellActions}>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(habitacion.id)}
                        className={adminPage.actionButton}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteClick(habitacion.id)}
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
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear Nueva Habitación"
      >
        <div className="max-h-[80vh] overflow-y-auto -m-6">
          <CreateRoomForm 
            onSuccess={handleCreateSuccess}
            hideHeader={true}
          />
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingHabitacion(null);
          setError(null);
        }}
        title="Editar Habitación"
      >
        {loadingHabitacion ? (
          <LoadingSpinner 
            size="md" 
            message="Cargando datos..." 
            className="p-8"
          />
        ) : editingHabitacion ? (
          <div className="max-h-[80vh] overflow-y-auto -m-6">
            <CreateRoomForm 
              onSuccess={handleEditSuccess}
              hideHeader={true}
              initialData={editingHabitacion}
              isEditing={true}
            />
          </div>
        ) : null}
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => {
          deleteModal.close();
          setDeletingHabitacionId(null);
          setError(null);
        }}
        onConfirm={handleDeleteConfirm}
        itemName={deletingHabitacionId ? habitaciones.find(h => h.id === deletingHabitacionId)?.numero || '' : ''}
        itemType="habitación"
        isLoading={isDeleting}
      />
    </div>
  );
}

