"use client";

interface SeparatorProps {
  text?: string;
  className?: string;
}

export default function Separator({ 
  text = "Or continue with",
  className = "" 
}: SeparatorProps) {
  return (
    <div className={`relative my-6 ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-600"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-[#2a2f4a] text-white">{text}</span>
      </div>
    </div>
  );
}

