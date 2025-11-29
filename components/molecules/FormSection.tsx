import React from 'react';
import { IconType } from 'react-icons';
import { typography } from '@/utils/Tokens';

interface FormSectionProps {
  icon: IconType;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  iconClassName?: string;
  variant?: 'default' | 'gradient';
}

export default function FormSection({
  icon: Icon,
  title,
  subtitle,
  children,
  className = '',
  iconClassName = '',
  variant = 'default',
}: FormSectionProps) {
  const headerBgClass = variant === 'gradient'
    ? 'bg-gradient-to-r from-[#0a174e] via-[#0a174e] to-[#222a54]'
    : 'bg-gradient-to-br from-gray-50 to-white';

  const iconContainerClass = variant === 'gradient'
    ? 'w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg'
    : 'w-10 h-10 rounded-lg bg-[#0a174e]/10 flex items-center justify-center';

  const iconClass = variant === 'gradient'
    ? 'text-2xl text-white'
    : 'text-[#0a174e] text-lg';

  const titleClass = variant === 'gradient'
    ? `${typography.cardTitle} text-white mb-0 text-xl sm:text-2xl`
    : `${typography.cardTitle} text-[#0a174e] text-lg`;

  const subtitleClass = variant === 'gradient'
    ? 'text-sm text-white/80 mt-0.5'
    : 'text-sm text-gray-600 mt-1';

  return (
    <div className={`bg-white rounded-2xl shadow-xl border-2 border-gray-100 hover:border-[#b6a253] transition-all duration-300 overflow-hidden ${className}`}>
      <div className={`${headerBgClass} px-4 sm:px-6 py-4 sm:py-5`}>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`${iconContainerClass} ${iconClassName}`}>
            <Icon className={iconClass} />
          </div>
          <div>
            <h2 className={titleClass}>
              {title}
            </h2>
            {subtitle && (
              <p className={subtitleClass}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        {children}
      </div>
    </div>
  );
}
