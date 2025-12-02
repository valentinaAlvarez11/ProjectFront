import React from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import { admin } from '@/utils/Tokens';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'dark';
  disabled?: boolean;
}

export default function QuickActionCard({ 
  title, 
  description, 
  icon, 
  href,
  variant = 'primary',
  disabled = false
}: QuickActionCardProps) {
  const iconClass = disabled
    ? admin.actionCard.iconDisabled
    : variant === 'secondary' 
    ? admin.actionCard.iconSecondary 
    : variant === 'dark' 
    ? admin.actionCard.iconDark 
    : admin.actionCard.iconPrimary;

  const containerClass = disabled 
    ? admin.actionCard.containerDisabled 
    : admin.actionCard.container;

  const titleClass = disabled 
    ? admin.actionCard.titleDisabled 
    : admin.actionCard.title;

  const descriptionClass = disabled 
    ? admin.actionCard.descriptionDisabled 
    : admin.actionCard.description;

  const content = (
    <div className={containerClass}>
      <div className={`${admin.actionCard.iconContainer} ${iconClass}`}>
        {icon}
      </div>
      <h3 className={titleClass}>
        {title}
      </h3>
      <p className={descriptionClass}>
        {description}
      </p>
      <div className="text-center">
        <Button 
          variant="primaryFull" 
          disabled={disabled}
          className={disabled ? admin.actionCard.buttonDisabled : ''}
        >
          Acceder
        </Button>
      </div>
    </div>
  );

  if (disabled) {
    return (
      <div className="block pointer-events-none">
        {content}
      </div>
    );
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}


