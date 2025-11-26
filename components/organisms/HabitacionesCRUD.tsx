"use client";

import React, { useEffect, useState } from 'react';
import RoomsService from '@/libs/rooms.service';
import { IRoom } from '@/interfaces/rooms';
import Modal from '@/components/atoms/Modal';
import Button from '@/components/atoms/ButtonAuth';
import CreateRoomForm from '@/components/molecules/CreateRoomForm';

export default function HabitacionesCRUD() {
  const [habitaciones, setHabitaciones] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingHabitacion, setEditingHabitacion] = useState<IRoom | null>(null);
  const [loadingHabitacion, setLoadingHabitacion] = useState(false);

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

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro de que desea eliminar esta habitación?')) {
      return;
    }

    try {
      await RoomsService.deleteRoom(id);
      alert('Habitación eliminada exitosamente');
      loadHabitaciones();
    } catch (err: any) {
      console.error('Error al eliminar habitación:', err);
      alert(err?.message || 'Error al eliminar la habitación');
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
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a174e] mx-auto"></div>
        <p className="mt-4 text-[#0a174e] font-semibold">Cargando habitaciones...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0a174e]">
            Gestión de Habitaciones
          </h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
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
        <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {habitaciones.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No hay habitaciones registradas</p>
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
                  Número
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Precio/Noche
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Disponible
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {habitaciones.map((habitacion) => (
                <tr key={habitacion.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {habitacion.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {habitacion.numero}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {habitacion.tipo}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
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
                  <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {habitacion.descripcion || 'Sin descripción'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(habitacion.id)}
                        className="text-[#0a174e] hover:text-[#b6a253] transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(habitacion.id)}
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
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a174e] mx-auto"></div>
            <p className="mt-4 text-[#0a174e] font-semibold">Cargando datos...</p>
          </div>
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
    </div>
  );
}

