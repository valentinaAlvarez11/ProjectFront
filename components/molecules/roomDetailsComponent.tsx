// components/molecules/RoomDetails.tsx
import React from 'react';
import { RoomInfo } from '../../interfaces/roomDetails'; // Importamos la interfaz actualizada
import { FaWifi, FaTv, FaShower, FaThermometerHalf } from 'react-icons/fa'; // Iconos de ejemplo

interface RoomDetailsProps {
    room: RoomInfo;
}

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case 'Wi-Fi':
      return <FaWifi className="text-blue-600" />;
    case 'Televisión':
      return <FaTv className="text-blue-600" />;
    case 'Aire acondicionado':
      return <FaThermometerHalf className="text-blue-600" />;
    case 'Baño con ducha':
        return <FaShower className="text-blue-600" />;
    default:
      return <span className="text-green-500">✔️</span>;
  }
};

const RoomDetails: React.FC<RoomDetailsProps> = ({ room }) => {
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Sección de la imagen principal */}
            <div className="relative">
                <img src={room.images[0]} alt={room.roomType} className="w-full h-96 object-cover" />
                <div className="absolute top-4 left-4 text-white text-lg font-bold bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                    {room.roomType.toUpperCase()}
                </div>
            </div>

            {/* Contenedor de información y precio */}
            <div className="flex flex-col lg:flex-row p-6 space-y-6 lg:space-y-0 lg:space-x-6">
                {/* Información de la habitación (izquierda) */}
                <div className="lg:w-2/3 space-y-6">
                    <div className="grid grid-cols-2 gap-4 text-gray-700">
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
                        {room.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                {getAmenityIcon(amenity)}
                                <span>{amenity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4">
                        <p className="text-lg text-gray-600">
                            {room.description}
                        </p>
                    </div>
                </div>

                {/* Sección de precios y botón de oferta (derecha) */}
                <div className="lg:w-1/3 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg shadow-inner">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mt-2">
                            $ {room.currentPrice}
                        </h2>
                        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200">
                            SELECCIONE OFERTA
                        </button>
                        <p className="mt-2 text-xs text-gray-500">Excluye impuestos y cargos</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;