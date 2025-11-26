import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}: SectionTitleProps) {
  return (
    <div className={`w-full bg-white py-16 px-0 flex flex-col items-center ${className}`}>
      <div className="w-[90vw] mx-auto mb-8">
        <hr className="border-none border-t-[4px] border-[#0a174e] mb-0.5" />
        <hr className="border-none border-t-[2px] border-[#0a174e] mt-0" />
      </div>
      <h2
        className={`text-5xl font-bold tracking-[0.3em] text-[#0a174e] my-8 ${titleClassName}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`max-w-[1200px] text-center text-2xl text-[#233876] mb-12 leading-relaxed ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

