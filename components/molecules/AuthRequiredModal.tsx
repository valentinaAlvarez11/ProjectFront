"use client";

import React from 'react';
import Link from 'next/link';
import Modal from '@/components/atoms/Modal';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Acceso Requerido">
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-[#0a1445] rounded-full flex items-center justify-center mb-4 shadow-lg border-2 border-[#b6a253]">
            <svg 
              className="w-10 h-10 text-[#b6a253]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#0a1445] mb-3">
            Inicia sesión para continuar
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Para seleccionar una oferta, necesitas iniciar sesión en tu cuenta.
            Si aún no tienes una cuenta, puedes crear una de forma gratuita.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Link
            href="/login"
            onClick={onClose}
            className="w-full bg-[#0a1445] hover:bg-[#222a54] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-center transform border-2 border-[#b6a253] hover:border-[#b6a253]"
          >
            Iniciar Sesión
          </Link>
          
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-[#222a54]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-[#0a1445] font-semibold">o</span>
            </div>
          </div>

          <Link
            href="/register"
            onClick={onClose}
            className="w-full bg-white border-2 border-[#0a1445] hover:border-[#222a54] font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-center transform"
          >
            <span className="text-[#0a1445]">
              Crear Cuenta
            </span>
          </Link>
        </div>

        <p className="text-xs text-center text-gray-600 pt-2 font-medium">
          Al crear una cuenta, aceptas nuestros términos y condiciones
        </p>
      </div>
    </Modal>
  );
};

export default AuthRequiredModal;

