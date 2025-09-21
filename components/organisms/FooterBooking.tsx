// components/FooterBooking.tsx
export default function FooterBooking() {
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
            <div className="flex flex-col text-xs md:text-sm">
              <label className="text-gray-500">Check-in</label>
              <input
                type="date"
                className="border px-2 py-1 rounded-md text-sm w-32"
              />
            </div>

            <div className="flex flex-col text-xs md:text-sm">
              <label className="text-gray-500">Check-out</label>
              <input
                type="date"
                className="border px-2 py-1 rounded-md text-sm w-32"
              />
            </div>
          </div>

          {/* Botón */}
          <button className="bg-[#0f1b3a] text-white px-5 py-2 rounded-md text-sm hover:bg-[#0b1630] transition">
            COMPROBAR LA DISPONIBILIDAD
          </button>
        </div>
      </div>
    </footer>
  );
}
