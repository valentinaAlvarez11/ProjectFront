import React from 'react';
import Image from 'next/image';

interface AmenityCardProps {
  imageUrl: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  showFreeLabel?: boolean;
  title: string;
}

export default function AmenityCard({
  imageUrl,
  imageAlt,
  imageWidth,
  imageHeight,
  showFreeLabel = true,
  title,
}: AmenityCardProps) {
  return (
    <div className="flex flex-col items-center w-full sm:w-auto sm:min-w-[250px] lg:min-w-[300px]">
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        className="mb-3 sm:mb-4 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
      />
      <span className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide text-[#0a174e] mb-4 sm:mb-5 ${showFreeLabel ? '' : 'invisible'}`}>
        FREE
      </span>
      <div className="bg-[#0a174e] text-white rounded-full py-3 sm:py-3.5 px-6 sm:px-8 w-full sm:w-[80%] text-center text-sm sm:text-base lg:text-lg font-medium">
        {title}
      </div>
    </div>
  );
}

