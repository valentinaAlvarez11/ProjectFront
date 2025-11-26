"use client";

import Image from "next/image";
import RestaurantBarSection from "@/components/organisms/RestaurantBarSection";
import {
  restaurantHeroSection,
  restaurantHeroOverlay,
  restaurantHeroTitle,
} from '@/utils/Tokens';

export default function RestaurantBarPage() {
  return (
    <>
      {/* Hero Section con imagen */}
      <section className={restaurantHeroSection}>
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
          alt="Restaurante y Bar del hotel"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay con gradiente */}
        <div className={restaurantHeroOverlay} />

        {/* Texto centrado */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className={restaurantHeroTitle}>
            RESTAURANTE & BAR
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white mt-4 sm:mt-6 text-center drop-shadow-lg max-w-3xl">
            Una experiencia gastronómica única frente al mar Caribe
          </p>
        </div>
      </section>

      {/* Sección de Restaurante y Bar */}
      <RestaurantBarSection />
    </>
  );
}


