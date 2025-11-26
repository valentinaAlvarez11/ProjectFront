// components/molecules/RoomDetails.tsx (REFRACTORIZADO Y CORREGIDO)

"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IRoom } from '@/interfaces/rooms';
import { useAuthStore } from '@/store/authStore';
import AuthRequiredModal from './AuthRequiredModal';
import Modal from '@/components/atoms/Modal';
import RoomsService from '@/libs/rooms.service'; 

interface RoomDetailsProps {
    room: IRoom;
}

// Función para obtener las instalaciones/amenities
const getActiveAmenities = (features: IRoom['caracteristicas'] | string[] | null): string[] => {
    // Si features es null o undefined, retornar array vacío
    if (!features) return [];
    
    // Si features es un array de strings (formato antiguo del backend)
    if (Array.isArray(features)) {
        return features;
    }
    
    // Si features es un objeto con instalaciones (formato nuevo)
    if (typeof features === 'object' && 'instalaciones' in features && features.instalaciones) {
        const map: { [key: string]: string } = {
            wifi: "WiFi Gratuito",
            television: "Televisión por Cable",
            aireAcondicionado: "Aire Acondicionado",
            banoDucha: "Baño Privado con Ducha",
            plancha: "Plancha y Tabla",
            toallas: "Juego de Toallas",
            smartTV: "Smart TV",
            refrigerador: "Refrigerador / Minibar",
        };
        
        return Object.entries(features.instalaciones)
            .filter(([, value]) => value === true)
            .map(([key]) => map[key]);
    }
    
    return [];
};


const RoomDetails: React.FC<RoomDetailsProps> = ({ room }) => {
    const router = useRouter();
    const { isLoggedIn, user, checkAuthStatus } = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    // Cerrar el modal de autenticación si el usuario se loguea
    useEffect(() => {
        if (isLoggedIn && isModalOpen) {
            setIsModalOpen(false);
        }
    }, [isLoggedIn, isModalOpen]);

    const isAdmin = isLoggedIn && user?.rol === 'admin';

    const handleEdit = () => {
        router.push(`/rooms/edit/${room.id}`);
    };

    const handleSelectOffer = () => {
        if (isLoggedIn) {
            // Si el usuario está logueado, no mostrar el modal
            // Aquí puedes agregar la lógica para redirigir a la página de reservas
            // Por ejemplo: router.push(`/reservations/create?roomId=${room.id}`);
            // Por ahora, simplemente no hacemos nada o podrías mostrar un mensaje
            console.log('Usuario logueado, proceder con la reserva');
            // TODO: Redirigir a página de reservas cuando esté disponible
        } else {
            // Si el usuario NO está logueado, mostrar el modal de autenticación
            setIsModalOpen(true);
        }
    };

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        setIsDeleteModalOpen(false);
        
        try {
            setIsDeleting(true);
            setDeleteError(null);
            await RoomsService.deleteRoom(room.id);
            router.push('/');
        } catch (err: any) {
            console.error('Error al eliminar habitación:', err);
            setDeleteError(err?.message || 'Error al eliminar la habitación');
        } finally {
            setIsDeleting(false);
        }
    };

    // 🔑 Paso 1: Debugging del Objeto Completo
    console.log("Datos de la habitación recibidos:", room); 
    
    // 🔑 Paso 2: Debugging del campo problemático
    console.log("Tipo de room.imagenes:", typeof room.imagenes, "Valor:", room.imagenes);

    // Función helper para validar y normalizar URLs de imágenes
    const getValidImageUrl = (imageUrl: string | undefined): string | null => {
        if (!imageUrl) {
            return null;
        }
        
        // Si ya es una URL absoluta (http:// o https://), usarla directamente
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            return imageUrl;
        }
        
        // Si empieza con /, es una ruta relativa válida
        if (imageUrl.startsWith('/')) {
            return imageUrl;
        }
        
        // Si no empieza con /, asumir que está en /images/
        if (imageUrl.includes('/') || imageUrl.includes('\\')) {
            // Tiene alguna estructura de ruta, agregar / al inicio
            return `/${imageUrl.replace(/^\/+/, '')}`;
        }
        
        // Si es solo un nombre de archivo como "url_1.jpg", no es válido
        return null;
    };

    const features = room.caracteristicas;
    const amenities = getActiveAmenities(features);
    const imageUrl = getValidImageUrl(room.imagenes?.[0]);
    const hasValidImage = imageUrl !== null;
    
    // Manejar características: puede ser array de strings o objeto estructurado
    let size = 'N/A';
    let bedDetails = 'N/A';
    let view = 'N/A';
    
    if (features && typeof features === 'object' && !Array.isArray(features)) {
        // Es un objeto estructurado
        size = features.tamano || 'N/A';
        bedDetails = features.camas || 'N/A';
        view = features.vista || 'N/A';
    } else if (Array.isArray(features)) {
        // Es un array de strings, intentar extraer información si es posible
        // Por ejemplo, buscar "Cama individual" o "Cama doble" en el array
        const bedInfo = features.find(f => f.toLowerCase().includes('cama'));
        if (bedInfo) bedDetails = bedInfo;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Imagen más grande */}
            <div className="relative mb-6 sm:mb-8">
                {hasValidImage ? (
                    <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src={imageUrl}
                            alt={`Imagen de la habitación ${room.numero}`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                ) : (
                    <div className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow-2xl">
                        <div className="text-center text-gray-600">
                            <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">🏨</div>
                            <p className="text-base sm:text-lg lg:text-xl font-semibold">Imagen no disponible</p>
                            <p className="text-xs sm:text-sm mt-2">Habitación {room.numero}</p>
                        </div>
                    </div>
                )}
                <div className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl shadow-lg backdrop-blur-sm">
                    {room.tipo.toUpperCase()} 
                </div>
            </div>

            <div className="px-0 sm:px-2 lg:px-6 mx-auto">
                {/* Botones de administración (solo para admin) */}
                {isAdmin && (
                    <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
                        <button
                            onClick={handleEdit}
                            className="group relative bg-gradient-to-r from-[#0a1445] to-[#222a54] hover:from-[#222a54] hover:to-[#0a1445] text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-[#b6a253] hover:border-[#d4c373] transform hover:-translate-y-1 hover:scale-105 text-sm sm:text-base flex items-center justify-center gap-2"
                        >
                            <span className="text-lg sm:text-xl transition-transform group-hover:rotate-12">✏️</span>
                            <span>Editar Habitación</span>
                        </button>
                        <button
                            onClick={handleDeleteClick}
                            disabled={isDeleting}
                            className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-400 disabled:to-red-500 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-red-500 hover:border-red-400 disabled:border-red-300 transform hover:-translate-y-1 hover:scale-105 disabled:hover:transform-none disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2"
                        >
                            {isDeleting ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    <span>Eliminando...</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-lg sm:text-xl transition-transform group-hover:scale-110">🗑️</span>
                                    <span>Eliminar Habitación</span>
                                </>
                            )}
                        </button>
                    </div>
                )}

                {deleteError && (
                    <div className="mb-6 bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg">
                        <p className="font-semibold">{deleteError}</p>
                    </div>
                )}

                {/* Tarjeta única con información, precio e instalaciones lado a lado */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 w-full border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {/* Columna izquierda: Información de la habitación y precio */}
                        <div className="flex flex-col">
                            {/* Información de la habitación */}
                            <div className="space-y-4 sm:space-y-5 mb-4 sm:mb-6">
                                <div className="flex items-center space-x-3 text-gray-800">
                                    <span className="text-xl sm:text-2xl">🏠</span>
                                    <span className="text-base sm:text-lg font-medium">{size}</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-800">
                                    <span className="text-xl sm:text-2xl">🛏️</span>
                                    <span className="text-base sm:text-lg font-medium">{bedDetails}</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-800">
                                    <span className="text-xl sm:text-2xl">🏙️</span>
                                    <span className="text-base sm:text-lg font-medium">{view}</span>
                                </div>
                            </div>

                            {/* Descripción */}
                            {room.descripcion && (
                                <div className="mb-4 sm:mb-6">
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{room.descripcion}</p>
                                </div>
                            )}

                            {/* Precio y botón */}
                            <div className="mt-auto">
                                <div className="flex flex-col gap-4">
                                    <div className="flex-1">
                                        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                                            $ {room.precio_noche.toFixed(2)}
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-500">Excluye impuestos y cargos</p>
                                    </div>
                                    <button 
                                        onClick={handleSelectOffer}
                                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                                    >
                                        SELECCIONE OFERTA
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Columna derecha: Instalaciones */}
                        {amenities.length > 0 && (
                            <div className="border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-6 xl:pl-8">
                                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Instalaciones</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
                                    {amenities.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                                            <span className="text-green-500 text-lg sm:text-xl">✔️</span>
                                            <span className="text-sm sm:text-base font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de autenticación requerida */}
            <AuthRequiredModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />

            {/* Modal de confirmación de eliminación */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Confirmar Eliminación"
            >
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="text-6xl mb-4">⚠️</div>
                        <p className="text-lg font-semibold text-gray-800 mb-2">
                            ¿Está seguro de que desea eliminar la habitación <span className="text-[#0a1445] font-bold">{room.numero}</span>?
                        </p>
                        <p className="text-sm text-red-600 font-medium">
                            Esta acción no se puede deshacer. Todos los datos de la habitación se perderán permanentemente.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            onClick={handleDeleteConfirm}
                            disabled={isDeleting}
                            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-400 disabled:to-red-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-red-500 hover:border-red-400 disabled:border-red-300 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:transform-none"
                        >
                            {isDeleting ? 'Eliminando...' : 'Sí, Eliminar'}
                        </button>
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            disabled={isDeleting}
                            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-400 hover:border-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:transform-none"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default RoomDetails;