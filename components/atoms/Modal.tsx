"use client";

import React from 'react';
import {
  modalBackdrop,
  modalBackdropGradient,
  modalContainer,
  modalHeader,
  modalTitle,
  modalCloseButton,
  modalContent,
} from '@/utils/Tokens';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div 
      className={modalBackdrop}
      style={{ background: modalBackdropGradient }}
      onClick={onClose}
    >
      <div 
        className={modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className={modalHeader}>
            <h2 className={modalTitle}>{title}</h2>
            <button
              onClick={onClose}
              className={modalCloseButton}
              aria-label="Cerrar modal"
            >
              <svg 
                className="w-6 h-6" 
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
        <div className={modalContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

