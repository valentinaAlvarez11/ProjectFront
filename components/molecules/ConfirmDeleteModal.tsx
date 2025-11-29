"use client";

import React from 'react';
import Modal from '@/components/atoms/Modal';
import {
  modalWarningIcon,
  modalWarningText,
  modalWarningTextHighlight,
  modalWarningSubtext,
  modalButtonContainer,
  modalButtonPrimary,
  modalButtonSecondary,
} from '@/utils/Tokens';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  itemName: string;
  itemType: string; // e.g., "habitación", "recepcionista"
  warningMessage?: string;
  isLoading?: boolean;
}

/**
 * Modal reutilizable para confirmar eliminación de elementos
 * Sigue el mismo estilo del modal de confirmación de eliminación de habitaciones
 */
const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar Eliminación",
  itemName,
  itemType,
  warningMessage,
  isLoading = false,
}) => {
  const defaultWarningMessage = `Esta acción no se puede deshacer. Todos los datos del ${itemType} se perderán permanentemente.`;

  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <div className="space-y-6 py-2">
        <div className="text-center">
          <div className={`${modalWarningIcon} transform transition-all duration-300 hover:scale-110`}>⚠️</div>
          <p className={`${modalWarningText} mt-2`}>
            ¿Está seguro de que desea eliminar {(itemType === 'habitación' || itemType === 'reserva') ? 'la' : 'el'}{' '}
            <span className={modalWarningTextHighlight}>{itemType} {itemName}</span>?
          </p>
          <p className={`${modalWarningSubtext} mt-2`}>
            {warningMessage || defaultWarningMessage}
          </p>
        </div>
        <div className={modalButtonContainer}>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`${modalButtonPrimary} transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Eliminando...
              </span>
            ) : (
              'Sí, Eliminar'
            )}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className={`${modalButtonSecondary} transition-all duration-300 hover:shadow-md hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;

