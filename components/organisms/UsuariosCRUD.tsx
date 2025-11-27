"use client";

import React, { useEffect, useState } from 'react';
import UsersService from '@/libs/users.service';
import { IUser } from '@/interfaces/users';
import UsuarioForm from '@/components/molecules/UsuarioForm';
import Modal from '@/components/atoms/Modal';
import Button from '@/components/atoms/ButtonAuth';
import ConfirmDeleteModal from '@/components/molecules/ConfirmDeleteModal';
import SuccessModal from '@/components/molecules/SuccessModal';
import ErrorModal from '@/components/molecules/ErrorModal';
import ErrorAlert from '@/components/molecules/ErrorAlert';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import { useModal } from '@/hooks/useModal';
import { useAuthStore } from '@/store/authStore';
import { adminPage, colors } from '@/utils/Tokens';

export default function UsuariosCRUD() {
  const [usuarios, setUsuarios] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState<IUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingUsuarioId, setDeletingUsuarioId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  // Hooks para manejar los modales
  const deleteModal = useModal();
  const successModal = useModal();
  const errorModal = useModal();
  const [errorModalMessage, setErrorModalMessage] = useState('');
  
  // Obtener el usuario actual para prevenir auto-eliminación
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await UsersService.getAllUsersAdmin();
      setUsuarios(response.usuarios);
    } catch (err: any) {
      console.error('Error al cargar usuarios:', err);
      setError(err?.message || 'Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingUsuario(null);
    setIsModalOpen(true);
  };

  const handleEdit = (usuario: IUser) => {
    setEditingUsuario(usuario);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    // Prevenir que el admin se elimine a sí mismo
    if (currentUser && currentUser.id === id) {
      setError('No puedes eliminar tu propio usuario');
      return;
    }
    setDeletingUsuarioId(id);
    deleteModal.open();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingUsuarioId) return;

    try {
      setIsDeleting(true);
      await UsersService.deleteUserAdmin(deletingUsuarioId);
      deleteModal.close();
      setDeletingUsuarioId(null);
      loadUsuarios();
      setSuccessMessage('Usuario eliminado exitosamente');
      successModal.open();
    } catch (err: any) {
      console.error('Error al eliminar usuario:', err);
      setError(err?.message || 'Error al eliminar el usuario');
      // No cerramos el modal si hay error, para que el usuario pueda intentar de nuevo
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (editingUsuario) {
        // Actualizar - la contraseña es opcional
        await UsersService.updateUserAdmin(editingUsuario.id, data);
        setSuccessMessage('Usuario actualizado exitosamente');
      } else {
        // Crear - todos los campos son obligatorios
        // Validar que todos los campos requeridos estén presentes
        if (!data.email || !data.telefono || !data.nombre || !data.contraseña || !data.rol) {
          setError('Todos los campos son obligatorios');
          setIsSubmitting(false);
          return;
        }
        
        // Asegurarse de que la contraseña no esté vacía
        if (data.contraseña.trim() === '') {
          setError('La contraseña es obligatoria');
          setIsSubmitting(false);
          return;
        }

        await UsersService.register({
          email: data.email.trim(),
          telefono: data.telefono.trim(),
          nombre: data.nombre.trim(),
          contraseña: data.contraseña,
          rol: data.rol,
        });
        setSuccessMessage('Usuario creado exitosamente');
      }

      setIsModalOpen(false);
      setEditingUsuario(null);
      successModal.open();
      loadUsuarios();
    } catch (err: any) {
      console.error('Error al guardar usuario:', err);
      const errorMessage = err?.message || 'Error al guardar el usuario';
      setError(errorMessage);
      // Mostrar error en modal también
      setErrorModalMessage(errorMessage);
      errorModal.open();
      // No cerrar el modal del formulario si hay error, para que el usuario pueda corregir
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleBadgeColor = (rol: string) => {
    switch (rol) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'recepcionista':
        return 'bg-blue-100 text-blue-800';
      case 'cliente':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (rol: string) => {
    switch (rol) {
      case 'admin':
        return 'Administrador';
      case 'recepcionista':
        return 'Recepcionista';
      case 'cliente':
        return 'Cliente';
      default:
        return rol;
    }
  };

  if (loading) {
    return (
      <LoadingSpinner 
        size="md" 
        message="Cargando usuarios..." 
        className="p-8"
      />
    );
  }

  return (
    <div className={adminPage.crudContainer}>
      <div className={adminPage.crudHeader}>
        <div>
          <h2 className={adminPage.crudTitle}>
            Gestión de Usuarios
          </h2>
          <p className={adminPage.crudSubtitle}>
            Administra todos los usuarios del sistema
          </p>
        </div>
        <Button
          onClick={handleCreate}
          variant="primary"
          className="w-full sm:w-auto"
        >
          + Crear Usuario
        </Button>
      </div>

      {error && (
        <ErrorAlert 
          message={error} 
          onClose={() => setError(null)}
        />
      )}

      {usuarios.length === 0 ? (
        <div className={adminPage.emptyState}>
          <p className={adminPage.emptyStateText}>No hay usuarios registrados</p>
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
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className={adminPage.tableCell}>
                    {usuario.id}
                  </td>
                  <td className={adminPage.tableCellMedium}>
                    {usuario.nombre}
                    {currentUser && currentUser.id === usuario.id && (
                      <span 
                        className="ml-2 text-xs font-semibold"
                        style={{ color: colors.accent.base }}
                      >
                        (Tú)
                      </span>
                    )}
                  </td>
                  <td className={adminPage.tableCellMuted}>
                    {usuario.email}
                  </td>
                  <td className={adminPage.tableCellMuted}>
                    {usuario.telefono}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(usuario.rol)}`}>
                      {getRoleLabel(usuario.rol)}
                    </span>
                  </td>
                  <td className={adminPage.tableCellActions}>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(usuario)}
                        className={adminPage.actionButton}
                        aria-label={`Editar usuario ${usuario.nombre}`}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteClick(usuario.id)}
                        disabled={currentUser && currentUser.id === usuario.id}
                        className={
                          currentUser && currentUser.id === usuario.id
                            ? adminPage.deleteButtonDisabled
                            : adminPage.deleteButton
                        }
                        aria-label={`Eliminar usuario ${usuario.nombre}`}
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
          setEditingUsuario(null);
          setError(null);
        }}
        title={editingUsuario ? 'Editar Usuario' : 'Crear Usuario'}
      >
        <UsuarioForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingUsuario(null);
            setError(null);
          }}
          initialData={editingUsuario ? {
            email: editingUsuario.email,
            telefono: editingUsuario.telefono,
            nombre: editingUsuario.nombre,
            rol: editingUsuario.rol,
          } : undefined}
          isEditing={!!editingUsuario}
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
          setDeletingUsuarioId(null);
          setError(null);
        }}
        onConfirm={handleDeleteConfirm}
        itemName={deletingUsuarioId ? usuarios.find(u => u.id === deletingUsuarioId)?.nombre || '' : ''}
        itemType="usuario"
        isLoading={isDeleting}
      />

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={successModal.close}
        title={editingUsuario ? "Usuario Actualizado" : deletingUsuarioId ? "Usuario Eliminado" : "Usuario Creado"}
        message={successMessage}
      />

      {/* Modal de error */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={errorModal.close}
        title="Error"
        message={errorModalMessage}
      />
    </div>
  );
}

