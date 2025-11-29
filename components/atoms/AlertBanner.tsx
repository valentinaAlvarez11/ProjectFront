import React from 'react';
import { colors } from '@/utils/Tokens';

interface AlertBannerProps {
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  onClose?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const typeClasses = {
  info: {
    container: 'bg-blue-50 border-blue-200',
    text: 'text-blue-800',
    icon: 'ℹ️',
  },
  warning: {
    container: 'bg-amber-50 border-amber-200',
    text: 'text-amber-800',
    icon: '⚠️',
  },
  error: {
    container: 'bg-red-50 border-red-200',
    text: 'text-red-800',
    icon: '❌',
  },
  success: {
    container: 'bg-green-50 border-green-200',
    text: 'text-green-800',
    icon: '✅',
  },
};

export default function AlertBanner({
  message,
  type = 'info',
  onClose,
  className = '',
  icon,
}: AlertBannerProps) {
  const typeClass = typeClasses[type];

  return (
    <div className={`animate-in fade-in duration-300 p-3 sm:p-4 border-2 rounded-lg ${typeClass.container} ${className}`}>
      <div className="flex items-start gap-2 sm:gap-3">
        {icon || <span className="text-base sm:text-lg">{typeClass.icon}</span>}
        <p className={`text-sm sm:text-base font-medium flex-1 ${typeClass.text}`}>
          {message}
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className={`${typeClass.text} hover:opacity-70 transition-opacity text-lg sm:text-xl font-bold`}
            aria-label="Cerrar"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
