import React from 'react';
import { adminPage } from '@/utils/Tokens';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function PageHeader({
  title,
  subtitle,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
}: PageHeaderProps) {
  return (
    <div className={`mb-6 sm:mb-8 w-full ${className}`}>
      <h1 className={`${adminPage.crudTitle} ${titleClassName}`}>
        {title}
      </h1>
      {subtitle && (
        <p className={`${adminPage.crudSubtitle} ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
