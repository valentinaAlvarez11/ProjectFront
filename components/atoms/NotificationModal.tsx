"use client";

import React from 'react';
import Modal from './Modal';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-lg border-2 border-green-500">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4 shadow-lg border-2 border-red-500">
            <svg
              className="w-10 h-10 text-red-600"
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
          </div>
        );
      case 'info':
        return (
          <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-lg border-2 border-blue-500">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-700';
      case 'error':
        return 'text-red-700';
      case 'info':
        return 'text-blue-700';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        {getIcon()}
        <h3 className={`text-2xl font-bold mb-3 ${getTitleColor()}`}>
          {title}
        </h3>
        <p className="text-gray-700 mb-6 text-base leading-relaxed">
          {message}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-[#0a1445] hover:bg-[#222a54] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-center transform border-2 border-[#b6a253] hover:border-[#b6a253]"
        >
          Aceptar
        </button>
      </div>
    </Modal>
  );
};

export default NotificationModal;



