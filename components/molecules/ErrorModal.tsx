"use client";

import React from 'react';
import Modal from '@/components/atoms/Modal';
import {
  modalButtonContainer,
  modalButtonError,
  modalErrorIcon,
  modalErrorText,
  modalErrorSubtext,
} from '@/utils/Tokens';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  details?: string; // Mensaje adicional opcional
}

/**
 * Modal reutilizable para mostrar mensajes de error
 * Sigue el mismo estilo del sistema de diseño
 */
const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title = "Error",
  message,
  details,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <div className="space-y-6 py-2">
        <div className="text-center">
          <div className={`${modalErrorIcon} transform transition-all duration-300 hover:scale-110`}>❌</div>
          <p className={`${modalErrorText} mt-2`}>
            {message}
          </p>
          {details && (
            <p className={`${modalErrorSubtext} mt-2`}>
              {details}
            </p>
          )}
        </div>
        <div className={modalButtonContainer}>
          <button
            onClick={onClose}
            className={`${modalButtonError} transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
          >
            Aceptar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ErrorModal;

