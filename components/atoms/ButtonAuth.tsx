  "use client";

  import React from "react";

  type Variant = "primary" | "ghost" | "outline" | "blue" | "purple" | "light" | "github" | "register";

  type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    fullWidth?: boolean;
    className?: string;
  };

  export default function Button({
    variant = "primary",
    fullWidth = true,
    className = "",
    children,
    ...rest
  }: Props) {
    // clases base y variantes
    const base = "rounded-lg text-base font-medium transition-colors";
    const width = fullWidth ? "w-full" : "";
    const padding =
      variant === "primary" ? "py-3" : variant === "outline" ? "py-2" : variant === "blue" ? "py-2.5" : variant === "purple" ? "py-3" : variant === "light" ? "py-2.5" : variant === "github" ? "py-2.5" : variant === "register" ? "py-2.5" : "py-3";
    
    const uppercaseClass = variant === "purple" ? "uppercase font-semibold" : "";

    const variantClass =
      variant === "primary"
        ? "bg-[#b6a253] text-white hover:bg-[#a5924a]"
        : variant === "register"
        ? "bg-[#b6a253] text-[#0a1445] hover:bg-[#c0ac66]"
        : variant === "blue"
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : variant === "purple"
        ? "bg-purple-600 text-white hover:bg-purple-700"
        : variant === "light"
        ? "bg-gray-300 text-white hover:bg-gray-400 border border-gray-400"
        : variant === "github"
        ? "bg-[#2a2f4a] text-white hover:bg-[#3a3f5a] border border-gray-600"
        : variant === "outline"
        ? "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
        : "bg-transparent text-[#b6a253]";

    return (
      <button
        {...rest}
        className={`${width} ${base} ${padding} ${variantClass} ${uppercaseClass} ${className}`}
      >
        {children}
      </button>
    );
  }
