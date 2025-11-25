// components/molecules/RoomDetails.tsx (REFRACTORIZADO Y CORREGIDO)

"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { IRoom } from '@/interfaces/rooms';
import AuthRequiredModal from './AuthRequiredModal'; 

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
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div className="max-w-7xl mx-auto">
            {/* Imagen más grande */}
            <div className="relative mb-8">
                {hasValidImage ? (
                    <div className="relative w-full h-[70vh] min-h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src={imageUrl}
                            alt={`Imagen de la habitación ${room.numero}`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                ) : (
                    <div 
                        className="rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow-2xl"
                        style={{ width: '100%', height: '70vh', minHeight: '600px' }}
                    >
                        <div className="text-center text-gray-600">
                            <div className="text-6xl mb-4">🏨</div>
                            <p className="text-xl font-semibold">Imagen no disponible</p>
                            <p className="text-sm mt-2">Habitación {room.numero}</p>
                        </div>
                    </div>
                )}
                <div className="absolute top-6 left-6 text-white text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-3 rounded-xl shadow-lg backdrop-blur-sm">
                    {room.tipo.toUpperCase()} 
                </div>
            </div>

            <div className="px-4 lg:px-6 mx-auto">
                {/* Tarjeta única con información, precio e instalaciones lado a lado */}
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Columna izquierda: Información de la habitación y precio */}
                        <div className="flex flex-col">
                            {/* Información de la habitación */}
                            <div className="space-y-5 mb-6">
                                <div className="flex items-center space-x-3 text-gray-800">
                                    <span className="text-2xl">🏠</span>
                                    <span className="text-lg font-medium">{size}</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-800">
                                    <span className="text-2xl">🛏️</span>
                                    <span className="text-lg font-medium">{bedDetails}</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-800">
                                    <span className="text-2xl">🏙️</span>
                                    <span className="text-lg font-medium">{view}</span>
                                </div>
                            </div>

                            {/* Descripción */}
                            {room.descripcion && (
                                <div className="mb-6">
                                    <p className="text-gray-600 leading-relaxed">{room.descripcion}</p>
                                </div>
                            )}

                            {/* Precio y botón */}
                            <div className="mt-auto">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="text-5xl font-bold text-gray-900 mb-2">
                                            $ {room.precio_noche.toFixed(2)}
                                        </div>
                                        <p className="text-sm text-gray-500">Excluye impuestos y cargos</p>
                                    </div>
                                    <button 
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
                                    >
                                        SELECCIONE OFERTA
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Columna derecha: Instalaciones */}
                        {amenities.length > 0 && (
                            <div className="border-l-0 lg:border-l border-gray-200 pl-0 lg:pl-8">
                                <h3 className="text-2xl font-bold mb-6 text-gray-900">Instalaciones</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {amenities.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                                            <span className="text-green-500 text-xl">✔️</span>
                                            <span className="text-base font-medium">{item}</span>
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
        </div>
    );
};

export default RoomDetails;