"use client";

import React, { useEffect, useState } from 'react';
import UsersService from '@/libs/users.service';
import { IUser } from '@/interfaces/users';
import RecepcionistaForm from '@/components/molecules/RecepcionistaForm';
import Modal from '@/components/atoms/Modal';
import Button from '@/components/atoms/ButtonAuth';
import ConfirmDeleteModal from '@/components/molecules/ConfirmDeleteModal';
import SuccessModal from '@/components/molecules/SuccessModal';
import { useModal } from '@/hooks/useModal';

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
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a174e] mx-auto"></div>
        <p className="mt-4 text-[#0a174e] font-semibold">Cargando recepcionistas...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0a174e]">
            Gestión de Recepcionistas
          </h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
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
        <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {recepcionistas.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No hay recepcionistas registrados</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#0a1445]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recepcionistas.map((recepcionista) => (
                <tr key={recepcionista.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {recepcionista.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {recepcionista.nombre}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {recepcionista.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {recepcionista.telefono}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {recepcionista.rol}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(recepcionista)}
                        className="text-[#0a174e] hover:text-[#b6a253] transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteClick(recepcionista.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
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
