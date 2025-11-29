import React from 'react';
import { colors, typography } from '@/utils/Tokens';

interface LoadingIndicatorProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  textClassName?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-8 w-8 sm:h-12 sm:w-12 border-b-2',
};

export default function LoadingIndicator({
  message,
  size = 'md',
  className = '',
  textClassName = '',
}: LoadingIndicatorProps) {
  return (
    <div className={`text-center py-4 px-6 bg-gradient-to-r from-[#0a174e]/10 via-[#0a174e]/5 to-[#222a54]/10 rounded-xl border-2 border-[#0a174e]/20 shadow-sm ${className}`}>
      <div className="flex items-center justify-center gap-3">
        <div className={`animate-spin rounded-full ${sizeClasses[size]} border-[#0a174e] border-t-transparent`}></div>
        {message && (
          <p className={`text-sm sm:text-base ${typography.body} text-[#0a174e] font-semibold ${textClassName}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
