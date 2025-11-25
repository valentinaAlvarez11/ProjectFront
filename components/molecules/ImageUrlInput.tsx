"use client";

import React from 'react';
import { UseFieldArrayAppend, UseFieldArrayRemove, UseFormRegister, FieldError } from 'react-hook-form';

interface ImageUrlInputProps {
  images: { id: string }[];
  register: UseFormRegister<any>;
  append: UseFieldArrayAppend<any>;
  remove: UseFieldArrayRemove;
  error?: FieldError;
}

const ImageUrlInput: React.FC<ImageUrlInputProps> = ({
  images,
  register,
  append,
  remove,
  error,
}) => {
  return (
    <div className="flex flex-col space-y-3">
      <label className="text-sm font-semibold text-[#0a1445]">
        Imágenes (URLs) <span className="text-gray-500 text-xs">(Máximo 10)</span>
      </label>
      
      {images.length === 0 && (
        <p className="text-sm text-gray-500 italic">No hay imágenes agregadas. Haga clic en "Agregar Imagen" para comenzar.</p>
      )}
      
      {images.map((image, index) => (
        <div key={image.id} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <input
            {...register(`imagenes.${index}` as const)}
            type="url"
            placeholder="https://ejemplo.com/imagen.jpg"
            className={`
              flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg
              transition-all duration-200
              focus:outline-none focus:ring-2
              text-sm sm:text-base
              ${error 
                ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
                : 'border-[#222a54] focus:border-[#b6a253] focus:ring-[#b6a253]/20'
              }
              bg-white text-[#0a1445]
              placeholder:text-gray-400
            `}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="px-3 sm:px-4 py-2 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-semibold whitespace-nowrap text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Eliminar
          </button>
        </div>
      ))}
      
      {images.length < 10 && (
        <button
          type="button"
          onClick={() => append('')}
          className="w-full px-4 py-2.5 sm:py-3 bg-[#222a54] hover:bg-[#0a1445] text-white rounded-lg transition-colors font-semibold border-2 border-[#b6a253] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#b6a253] focus:ring-offset-2"
        >
          + Agregar Imagen
        </button>
      )}
      
      {error && (
        <p className="text-sm text-red-500 font-medium">{error.message}</p>
      )}
    </div>
  );
};

export default ImageUrlInput;

