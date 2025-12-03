"use client";

import React, { useEffect, useState } from 'react';
import ReservationsService from '@/libs/reservations.service';
import { IReservationAdmin, IReservationUpdatePayload } from '@/interfaces/reservations';
import ReservationForm from '@/components/molecules/ReservationForm';
import Modal from '@/components/atoms/Modal';
import Button from '@/components/atoms/ButtonAuth';
import ConfirmDeleteModal from '@/components/molecules/ConfirmDeleteModal';
import SuccessModal from '@/components/molecules/SuccessModal';
import ErrorModal from '@/components/molecules/ErrorModal';
import ErrorAlert from '@/components/molecules/ErrorAlert';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import { useModal } from '@/hooks/useModal';
import { adminPage, colors } from '@/utils/Tokens';
import RoleBadge from '@/components/atoms/RoleBadge';
import { CreateReservationFormData, UpdateReservationFormData } from '@/schemas/reservation';
import { useAuthStore } from '@/store/authStore';

export default function ReservationsCRUD() {
  const { user: currentUser } = useAuthStore();
  const [reservations, setReservations] = useState<IReservationAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<IReservationAdmin | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingReservationId, setDeletingReservationId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  const deleteModal = useModal();
  const successModal = useModal();
  const errorModal = useModal();
  const [errorModalMessage, setErrorModalMessage] = useState('');

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ReservationsService.getAllAdmin();
      setReservations(response.reservas);
    } catch (err: any) {
      console.error('Error al cargar reservas:', err);
      setError(err?.message || 'Error al cargar las reservas');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingReservation(null);
    setIsModalOpen(true);
  };

  const handleEdit = (reservation: IReservationAdmin) => {
    setEditingReservation(reservation);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingReservationId(id);
    deleteModal.open();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingReservationId) return;

    try {
      setIsDeleting(true);
      await ReservationsService.deleteReservationAdmin(deletingReservationId);
      deleteModal.close();
      setDeletingReservationId(null);
      loadReservations();
      setSuccessMessage('Reserva eliminada exitosamente');
      successModal.open();
    } catch (err: any) {
      console.error('Error al eliminar reserva:', err);
      setErrorModalMessage(err?.message || 'Error al eliminar la reserva');
      errorModal.open();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (data: CreateReservationFormData | UpdateReservationFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (editingReservation) {
        // Actualizar reserva
        const updateData: IReservationUpdatePayload = {
          habitacionId: Number(data.habitacionId),
          fecha_inicio: data.fecha_inicio,
          fecha_fin: data.fecha_fin,
          estado: (data as UpdateReservationFormData).estado,
        };
        await ReservationsService.updateReservationAdmin(editingReservation.id, updateData);
        setSuccessMessage('Reserva actualizada exitosamente');
      } else {
        // Crear reserva
        const payload: any = {
          habitacionId: Number(data.habitacionId),
          fecha_inicio: data.fecha_inicio,
          fecha_fin: data.fecha_fin,
        };
        
        // Si es admin o recepcionista y tiene usuarioId, agregarlo
        if ((data as CreateReservationFormData).usuarioId) {
          payload.usuarioId = Number((data as CreateReservationFormData).usuarioId);
        }
        
        await ReservationsService.createReservation(payload);
        setSuccessMessage('Reserva creada exitosamente');
      }

      setIsModalOpen(false);
      setEditingReservation(null);
      loadReservations();
      successModal.open();
    } catch (err: any) {
      console.error('Error al guardar reserva:', err);
      setErrorModalMessage(err?.message || 'Error al procesar la reserva');
      errorModal.open();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingReservation(null);
    setError(null);
  };

  const getEstadoBadgeColor = (estado: string) => {
    switch (estado) {
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    // Trabajar directamente con strings YYYY-MM-DD para evitar problemas de zona horaria
    // Si viene con formato ISO (con 'T'), tomar solo la parte de la fecha
    const dateOnly = dateString.split('T')[0];
    const [year, month, day] = dateOnly.split('-').map(Number);
    
    // Crear fecha en UTC para formatear sin problemas de zona horaria
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={adminPage.contentWrapper}>
      <div className={adminPage.cardContainer}>
        <div className={adminPage.crudContainer}>
          <div className={adminPage.crudHeader}>
            <div>
              <h1 className={adminPage.crudTitle}>Gestión de Reservas</h1>
              <p className={adminPage.crudSubtitle}>
                Administra las reservas del hotel
              </p>
            </div>
            <Button
              onClick={handleCreate}
              variant="primary"
              className="w-full sm:w-auto"
            >
              + Crear Reserva
            </Button>
          </div>

          {error && (
            <ErrorAlert 
              message={error} 
              onClose={() => setError(null)}
            />
          )}

          {reservations.length === 0 ? (
            <div className={adminPage.emptyState}>
              <p className={adminPage.emptyStateText}>No hay reservas registradas</p>
            </div>
          ) : (
            <>
              {/* Resumen de reservas */}
              <div className="mb-6 p-4 bg-gradient-to-r from-[#0a174e]/10 to-[#222a54]/10 rounded-lg border-l-4 border-[#b6a253]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Total Reservas</p>
                    <p className="text-2xl font-bold text-[#0a174e]">{reservations.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Creadas por ti</p>
                    <p className="text-2xl font-bold text-[#b6a253]">
                      {currentUser ? reservations.filter(r => r.email_creador === currentUser.email).length : 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Creadas por clientes</p>
                    <p className="text-2xl font-bold text-[#0a174e]">
                      {reservations.filter(r => !r.nombre_creador || (r.email_creador && r.email_creador !== currentUser?.email)).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className={adminPage.tableWrapper}>
                <table className={adminPage.table}>
                <thead className={adminPage.tableHeader}>
                  <tr>
                    <th className={adminPage.tableHeaderCell}>ID</th>
                    <th className={adminPage.tableHeaderCell}>Habitación</th>
                    <th className={adminPage.tableHeaderCell}>Usuario (Reserva)</th>
                    <th className={adminPage.tableHeaderCell}>Fecha Inicio</th>
                    <th className={adminPage.tableHeaderCell}>Fecha Fin</th>
                    <th className={adminPage.tableHeaderCell}>Estado</th>
                    <th className={adminPage.tableHeaderCell}>Precio Total</th>
                    <th className={adminPage.tableHeaderCellRight}>Acciones</th>
                  </tr>
                </thead>
                <tbody className={adminPage.tableRow}>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-gray-50">
                      <td className={adminPage.tableCell}>{reservation.id}</td>
                      <td className={adminPage.tableCellMedium}>
                        {reservation.numero_habitacion}
                      </td>
                      <td className={adminPage.tableCell}>
                        <div>
                          <div className="font-medium text-[#0a174e]">{reservation.nombre_usuario}</div>
                          <div className="text-sm text-gray-500">{reservation.email_usuario}</div>
                        </div>
                      </td>
                      <td className={adminPage.tableCell}>
                        {formatDate(reservation.fecha_inicio)}
                      </td>
                      <td className={adminPage.tableCell}>
                        {formatDate(reservation.fecha_fin)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoBadgeColor(reservation.estado)}`}>
                          {reservation.estado.charAt(0).toUpperCase() + reservation.estado.slice(1)}
                        </span>
                      </td>
                      <td className={adminPage.tableCellMedium}>
                        {formatCurrency(reservation.precio_total)}
                      </td>
                      <td className={adminPage.tableCellActions}>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(reservation)}
                            className={adminPage.actionButton}
                            aria-label={`Editar reserva ${reservation.id}`}
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteClick(reservation.id)}
                            className={adminPage.deleteButton}
                            aria-label={`Eliminar reserva ${reservation.id}`}
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
            </>
          )}

          <Modal
            isOpen={isModalOpen}
            onClose={handleCancel}
            title={editingReservation ? 'Editar Reserva' : 'Crear Nueva Reserva'}
            size="large"
          >
            <ReservationForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingReservation || undefined}
              isEditing={!!editingReservation}
              isLoading={isSubmitting}
              isAdmin={currentUser?.rol === 'admin' || currentUser?.rol === 'recepcionista'}
            />
          </Modal>

          <ConfirmDeleteModal
            isOpen={deleteModal.isOpen}
            onClose={deleteModal.close}
            onConfirm={handleDeleteConfirm}
            itemName={deletingReservationId ? `#${deletingReservationId}` : ''}
            itemType="reserva"
            isLoading={isDeleting}
          />

          <SuccessModal
            isOpen={successModal.isOpen}
            onClose={successModal.close}
            message={successMessage}
          />

          <ErrorModal
            isOpen={errorModal.isOpen}
            onClose={errorModal.close}
            title="Error"
            message={errorModalMessage}
          />
        </div>
      </div>
    </div>
  );
}

