import React from "react";
import Image from "next/image";

interface FeatureCardProps {
  imageUrl: string;
  imageAlt: string;
  title?: string;
  description: string;
  imageWidth?: number;
  imageHeight?: number;
}

export default function FeatureCard({
  imageUrl,
  imageAlt,
  title,
  description,
  imageWidth = 100,
  imageHeight = 100,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center w-[300px]">
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        className="mb-2.5"
      />
      {title && (
        <span className="text-3xl font-bold tracking-wider text-[#0a174e] mb-5">
          {title}
        </span>
      )}
      <div className="bg-[#0a174e] text-white rounded-[30px] py-3 w-4/5 mt-5 text-center text-xl">
        {description}
      </div>
    </div>
  );
}

