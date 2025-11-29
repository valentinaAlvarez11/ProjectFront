"use client";

import React from 'react';
import {
  modalBackdrop,
  modalBackdropGradient,
  modalContainer as originalModalContainer, // Renombrado para no colisionar
  modalContainerSmall,
  modalContainerLarge,
  modalHeader,
  modalTitle,
  modalCloseButton,
  modalContent as originalModalContent,     // Renombrado
} from '@/utils/Tokens';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'small' | 'large';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, size }) => {
  if (!isOpen) return null;

  // Seleccionamos el contenedor según el tamaño
  const baseContainer = size === 'small' ? modalContainerSmall : size === 'large' ? modalContainerLarge : originalModalContainer;
  
  // Extendemos las clases de modalContainer: Añadimos 'flex flex-col' y 'max-h-[90vh]'.
  // Esto convierte el modal en un flex container vertical con altura máxima limitada.
  const modalContainerClasses = `${baseContainer} flex flex-col max-h-[90vh] transform transition-all duration-300 ease-out animate-in fade-in zoom-in`;

  // Extendemos las clases de modalContent: Añadimos 'overflow-y-auto' y 'flex-grow'.
  // Esto permite el scroll interno y que el contenido ocupe el espacio restante.
  const modalContentClasses = `${originalModalContent} overflow-y-auto flex-grow`;

  return (
    <div 
      className={`${modalBackdrop} transition-opacity duration-300`}
      style={{ background: modalBackdropGradient }}
      onClick={onClose}
    >
      <div 
        className={modalContainerClasses} // Usamos las clases extendidas
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className={`${modalHeader} shadow-sm`}>
            <h2 className={modalTitle}>{title}</h2>
            <button
              onClick={onClose}
              className={`${modalCloseButton} transition-all duration-200 hover:bg-gray-100 rounded-lg p-1 hover:scale-110`}
              aria-label="Cerrar modal"
            >
              <svg 
                className="w-6 h-6 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
        )}
        <div className={modalContentClasses}> {/* Usamos las clases extendidas */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;