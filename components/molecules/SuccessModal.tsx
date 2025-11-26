"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/atoms/Modal';
import {
  modalButtonContainer,
  modalButtonSuccess,
  modalSuccessIcon,
  modalSuccessText,
} from '@/utils/Tokens';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  autoCloseDelay?: number; // Tiempo en milisegundos antes de cerrar automáticamente (0 = no cerrar)
}

/**
 * Modal reutilizable para mostrar mensajes de éxito
 * Sigue el mismo estilo del sistema de diseño
 */
const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "¡Éxito!",
  message,
  autoCloseDelay = 0,
}) => {
  useEffect(() => {
    if (isOpen && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDelay, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <div className="space-y-6">
        <div className="text-center">
          <div className={modalSuccessIcon}>✅</div>
          <p className={modalSuccessText}>
            {message}
          </p>
        </div>
        <div className={modalButtonContainer}>
          <button
            onClick={onClose}
            className={modalButtonSuccess}
          >
            Aceptar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;

