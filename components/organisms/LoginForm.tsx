"use client";

import Image from "next/image";
import { FiUser } from "react-icons/fi";
import LoginComponent from "../molecules/LoginComponent";
import TextLink from "../atoms/TextLink";
import { loginCardContainer, loginTitle, loginTextLink } from "@/utils/Tokens";

export default function LoginForm() {
  
  const backgroundImageUrl = "https://www.realhotelsandresorts.com/wp-content/uploads/2024/08/Hotel-Facade_6128-1536x1024.jpg";

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImageUrl}
          alt="Hotel background"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay - Degradado de oscuro a más claro */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1445]/90 via-[#0a1445]/70 to-[#1a1f3a]/80" />
      </div>

      {/* Centered Login Form */}
      <div className="relative z-10 w-full max-w-md mx-4 flex items-center justify-center">
        <div className={loginCardContainer}>
          {/* Icon and Title */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 bg-[#b6a253]/20 rounded-full flex items-center justify-center mb-4">
              <FiUser className="w-8 h-8 text-[#b6a253]" />
            </div>
            <h2 className={loginTitle}>
              Login to your account
            </h2>
          </div>

          {/* Login Form */}
          <LoginComponent />

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <TextLink href="/register" className={loginTextLink}>
              Don&apos;t have an account? <span className="underline text-white">Sign up</span>
            </TextLink>
          </div>
        </div>
      </div>
    </div>
  );
}

