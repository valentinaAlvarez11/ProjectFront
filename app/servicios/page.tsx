// app/services/page.tsx
import Image from "next/image";

export default function ServiciosPage() {
  return (
    <div className="relative w-full h-[70vh]">
      {/* Imagen de fondo desde enlace externo */}
      <Image
        src="https://static.wixstatic.com/media/820831_4badbe8289e54f299867565203d031e6~mv2.jpg/v1/fill/w_1143,h_900,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_4badbe8289e54f299867565203d031e6~mv2.jpg"
        alt="Servicios del hotel"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Texto centrado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-wide uppercase">
          Servicios
        </h1>
      </div>
    </div>
  );
}
