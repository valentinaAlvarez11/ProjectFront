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
}

export default function QuickActionCard({ 
  title, 
  description, 
  icon, 
  href,
  variant = 'primary' 
}: QuickActionCardProps) {
  const iconClass = variant === 'secondary' 
    ? admin.actionCard.iconSecondary 
    : variant === 'dark' 
    ? admin.actionCard.iconDark 
    : admin.actionCard.iconPrimary;

  return (
    <Link href={href} className="block">
      <div className={admin.actionCard.container}>
        <div className={`${admin.actionCard.iconContainer} ${iconClass}`}>
          {icon}
        </div>
        <h3 className={admin.actionCard.title}>
          {title}
        </h3>
        <p className={admin.actionCard.description}>
          {description}
        </p>
        <div className="text-center">
          <Button variant="primaryFull">
            Acceder
          </Button>
        </div>
      </div>
    </Link>
  );
}

