import React from 'react';
import { adminPage } from '@/utils/Tokens';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const maxWidthClasses = {
  sm: 'max-w-[95%] sm:max-w-[90%]',
  md: 'max-w-[95%] lg:max-w-[90%]',
  lg: 'max-w-[95%] lg:max-w-[90%] xl:max-w-[85%]',
  xl: 'max-w-[95%] lg:max-w-[90%] xl:max-w-[85%] 2xl:max-w-[80%]',
  '2xl': 'max-w-[95%] lg:max-w-[90%] xl:max-w-[85%] 2xl:max-w-[1800px]',
  full: 'max-w-full',
};

export default function PageContainer({
  children,
  className = '',
  maxWidth = '2xl',
}: PageContainerProps) {
  return (
    <div className={`${adminPage.container} ${className}`}>
      <div className={`${adminPage.contentWrapper} ${maxWidthClasses[maxWidth]} mx-auto`}>
        {children}
      </div>
    </div>
  );
}
