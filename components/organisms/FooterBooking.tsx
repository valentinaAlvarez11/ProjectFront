// components/FooterBooking.tsx
"use client";
import { useForm } from "react-hook-form";
import InputComponents from "../atoms/InputComponents";
import ButtonComponent from "../atoms/ButtonComponent";

export default function FooterBooking() {
  const { register } = useForm();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-3 py-2">
        {/* Contenedor principal, todo centrado */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 flex-wrap">
          {/* Título */}
          <div className="flex items-baseline gap-1">
            <span className="text-lg md:text-xl font-extrabold text-gray-800 tracking-tight">
              RESERVAR
            </span>
            <span className="text-sm md:text-base font-medium text-gray-600">
              ONLINE
            </span>
          </div>

          {/* Fechas */}
          <div className="flex items-center gap-2 flex-wrap">
            <label className="text-gray-500 text-sm">Check-in</label>
            <input
              type="date"
              {...register("checkIn")}
              className="border px-2 py-1 rounded-md text-sm w-32"
            />
            <label className="text-gray-500 text-sm">Check-out</label>
            <input
              type="date"
              {...register("checkOut")}
              className="border px-2 py-1 rounded-md text-sm w-32"
            />
          </div>

          {/* Botón */}
          <ButtonComponent variant="secondary" size="sm">
            COMPROBAR LA DISPONIBILIDAD
          </ButtonComponent>
        </div>
      </div>
    </footer>
  );
}
