// app/servicios/page.tsx
"use client";

import Image from "next/image";
import ServicesSection from "@/components/organisms/ServicesSection";

export default function ServiciosPage() {
  return (
    <>
      {/* Hero Section con imagen */}
      <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[300px] sm:min-h-[400px]">
        <Image
          src="https://static.wixstatic.com/media/820831_4badbe8289e54f299867565203d031e6~mv2.jpg/v1/fill/w_1143,h_900,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_4badbe8289e54f299867565203d031e6~mv2.jpg"
          alt="Servicios del hotel"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay oscuro para mejor legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />

        {/* Texto centrado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg px-4 text-center">
            SERVICIOS
          </h1>
        </div>
      </section>

      {/* Sección de servicios */}
      <ServicesSection />
    </>
  );
}
