// components/molecules/RoomDetails.tsx
import React from 'react';
import { RoomInfo } from '../../interfaces/roomDetails';
import ButtonComponent from '../atoms/ButtonComponent';

interface RoomDetailsProps {
    room: RoomInfo;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ room }) => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Sección de la imagen */}
            <div className="relative">
                <img 
                    src={room.images[0]} 
                    alt={room.roomType} 
                    className="w-full h-[600px] object-cover" 
                />
                <div className="absolute top-4 left-4 text-white text-lg font-bold bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                    {room.roomType.toUpperCase()}
                </div>
            </div>

            {/* Contenedor principal de las tarjetas, subido con margen negativo y centrado */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 -mt-[100px] relative z-10 px-4 lg:px-6 mx-auto">
                
                {/* Contenedor de las dos tarjetas de la izquierda (Información e Instalaciones) */}
                <div className="flex flex-col gap-6">
                    {/* Tarjeta de Información Principal */}
                    <div className="bg-white rounded-lg shadow-xl p-6 lg:p-8 w-full">
                        <div className="space-y-4">
                            <div className="grid gap-4 text-gray-700">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xl">🏠</span>
                                    <span>{room.size}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xl">🛏️</span>
                                    <span>{room.bedDetails}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xl">🏙️</span>
                                    <span>{room.view}</span>
                                </div>
                            </div>
                        </div>
                        {/* Sección de la descripción */}
                        <div className="border-t pt-4 mt-4">
                            <p className="text-lg text-gray-600">{room.description}</p>
                        </div>
                    </div>

                    {/* Tarjeta de Instalaciones */}
                    <div className="bg-white rounded-lg shadow-md p-6 w-full">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Instalaciones</h3>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                            {room.amenities.map((item, index) => (
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
                        <h2 className="text-4xl font-bold text-gray-900 mt-2">$ {room.currentPrice}</h2>
                        <ButtonComponent 
                            variant="primary" 
                            fullWidth 
                            className="mt-6 bg-blue-600 hover:bg-blue-700"
                        >
                            SELECCIONE OFERTA
                        </ButtonComponent>
                        <p className="mt-2 text-xs text-gray-500">Excluye impuestos y cargos</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RoomDetails;