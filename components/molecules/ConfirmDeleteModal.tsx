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
      <div className="space-y-6">
        <div className="text-center">
          <div className={modalWarningIcon}>⚠️</div>
          <p className={modalWarningText}>
            ¿Está seguro de que desea eliminar {itemType === 'habitación' ? 'la' : 'el'}{' '}
            <span className={modalWarningTextHighlight}>{itemType} {itemName}</span>?
          </p>
          <p className={modalWarningSubtext}>
            {warningMessage || defaultWarningMessage}
          </p>
        </div>
        <div className={modalButtonContainer}>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={modalButtonPrimary}
          >
            {isLoading ? 'Eliminando...' : 'Sí, Eliminar'}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className={modalButtonSecondary}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;

