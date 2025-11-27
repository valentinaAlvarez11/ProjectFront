import React from 'react';
import { admin } from '@/utils/Tokens';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  variant?: 'primary' | 'success' | 'error';
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  variant = 'primary' 
}: StatCardProps) {
  const iconClass = variant === 'success' 
    ? admin.statCard.iconSuccess 
    : variant === 'error' 
    ? admin.statCard.iconError 
    : admin.statCard.iconPrimary;

  return (
    <div className={admin.statCard.container}>
      <div className={`${admin.statCard.iconContainer} ${iconClass}`}>
        {icon}
      </div>
      <h3 className={admin.statCard.value}>
        {value}
      </h3>
      <p className={admin.statCard.label}>
        {title}
      </p>
    </div>
  );
}

