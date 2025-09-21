// app/services/page.tsx
import Image from "next/image";
import servicesImage from "../../app/assets/services.avif"; 

export default function ServiciosPage() {
  return (
    <div className="relative w-full h-[70vh]">
      {/* Imagen de fondo */}
      <Image
        src={servicesImage}
        alt="Servicios del hotel"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay oscuro para mejorar contraste */}
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
