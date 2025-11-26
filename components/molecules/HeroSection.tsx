import React from "react";
import Image from "next/image";

interface HeroSectionProps {
  imageUrl: string;
  imageAlt: string;
  title?: string;
  subtitle?: string;
  height?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  className?: string;
}

export default function HeroSection({
  imageUrl,
  imageAlt,
  title,
  subtitle,
  height = "70vh",
  overlay = true,
  overlayOpacity = 0.4,
  className = "",
}: HeroSectionProps) {
  return (
    <section 
      className={`relative w-full ${className}`}
      style={{ height }}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
      />
      
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {(title || subtitle) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          {title && (
            <h1 className="text-5xl font-bold text-white mb-4 text-center px-4">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-xl text-white text-center px-4 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

