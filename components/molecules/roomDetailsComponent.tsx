// components/molecules/RoomDetails.tsx (REFRACTORIZADO Y CORREGIDO)

import React from 'react';
import Image from 'next/image';
import { IRoom } from '@/interfaces/rooms'; 

interface RoomDetailsProps {
    room: IRoom;
}

const getActiveAmenities = (features: IRoom['caracteristicas']) => {
    if (!features || !features.instalaciones) return [];
    
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
};


const RoomDetails: React.FC<RoomDetailsProps> = ({ room }) => {

    // 🔑 Paso 1: Debugging del Objeto Completo
    console.log("Datos de la habitación recibidos:", room); 
    
    // 🔑 Paso 2: Debugging del campo problemático
    console.log("Tipo de room.imagenes:", typeof room.imagenes, "Valor:", room.imagenes);


    const features = room.caracteristicas;
    const amenities = getActiveAmenities(features);
    const imageUrl = room.imagenes?.[0] || '/images/default_room.jpg';
    const size = features?.tamano || 'N/A';
    const bedDetails = features?.camas || 'N/A';
    const view = features?.vista || 'N/A';

    return (
        <div className="max-w-7xl mx-auto">
            <div className="relative">
                <img
                    src={imageUrl} 
                    alt={room.tipo} 
                    className="w-full h-[600px] object-cover" 
                />
                <div className="absolute top-4 left-4 text-white text-lg font-bold bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                    {room.tipo.toUpperCase()} 
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 -mt-[100px] relative z-10 px-4 lg:px-6 mx-auto">

                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-lg shadow-xl p-6 lg:p-8 w-full">
                        <div className="space-y-4">
                            <div className="grid gap-4 text-gray-700">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xl">🏠</span>
                                    <span>{size}</span> {/* 🔑 Mapeado de features.tamano */}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xl">🛏️</span>
                                    <span>{bedDetails}</span> {/* 🔑 Mapeado de features.camas */}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xl">🏙️</span>
                                    <span>{view}</span> {/* 🔑 Mapeado de features.vista */}
                                </div>
                            </div>
                        </div>
                        {/* Sección de la descripción */}
                        <div className="border-t pt-4 mt-4">
                            <p className="text-lg text-gray-600">{room.descripcion}</p> {/* 🔑 Usamos room.descripcion */}
                            </div>
                        {/* Tarjeta de Instalaciones */}
                        <div className="bg-white rounded-lg shadow-md p-6 w-full">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Instalaciones</h3>
                            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                {amenities.map((item, index) => ( // 🔑 Usamos el array mapeado
                                    <div key={index} className="flex items-center text-gray-700">
                                        <span className="text-green-500 mr-2">✔️</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta de Precios */}
                    <div className="bg-white rounded-lg shadow-xl p-6 lg:p-8 w-full h-[250px] flex flex-col items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-gray-900 mt-2">$ {room.precio_noche.toFixed(2)}</h2> {/* 🔑 Usamos room.precio_noche */}
                            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200">
                                SELECCIONE OFERTA
                            </button>
                            <p className="mt-2 text-xs text-gray-500">Excluye impuestos y cargos</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;