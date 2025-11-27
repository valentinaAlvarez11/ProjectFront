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
      <div className="space-y-6">
        <div className="text-center">
          <div className={modalErrorIcon}>❌</div>
          <p className={modalErrorText}>
            {message}
          </p>
          {details && (
            <p className={modalErrorSubtext}>
              {details}
            </p>
          )}
        </div>
        <div className={modalButtonContainer}>
          <button
            onClick={onClose}
            className={modalButtonError}
          >
            Aceptar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ErrorModal;

