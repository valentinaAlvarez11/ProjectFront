import React from 'react';
import { sections } from '@/utils/Tokens';

interface SectionTitleProps {
  title: string;
  className?: string;
  showLines?: boolean;
}

export default function SectionTitle({ 
  title, 
  className = "",
  showLines = true 
}: SectionTitleProps) {
  return (
    <>
      {showLines && (
        <div className={sections.titleContainer}>
          <hr className={sections.titleLine} />
          <hr className={sections.titleLineThin} />
        </div>
      )}
      <h2 className={`${sections.title} ${className}`}>
        {title}
      </h2>
    </>
  );
}


