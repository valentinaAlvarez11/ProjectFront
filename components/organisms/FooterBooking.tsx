// components/FooterBooking.tsx
export default function FooterBooking() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white z-50 shadow-lg border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        {/* Contenedor principal, todo centrado */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap">

          {/* Título */}
          <div className="flex items-baseline gap-1 order-1 sm:order-none">
            <span className="text-base sm:text-lg md:text-xl font-extrabold text-gray-800 tracking-tight">
              RESERVAR
            </span>
            <span className="text-xs sm:text-sm md:text-base font-medium text-gray-600">
              ONLINE
            </span>
          </div>

          {/* Fechas */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 flex-1 sm:flex-none order-2 sm:order-none">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
              <label className="text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap">Check-in</label>
              <input
                type="date"
                className="border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm w-full sm:w-36 md:w-40 focus:outline-none focus:ring-2 focus:ring-[#0f1b3a] focus:border-transparent"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
              <label className="text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap">Check-out</label>
              <input
                type="date"
                className="border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm w-full sm:w-36 md:w-40 focus:outline-none focus:ring-2 focus:ring-[#0f1b3a] focus:border-transparent"
              />
            </div>
          </div>

          {/* Botón */}
          <button className="w-full sm:w-auto bg-[#0f1b3a] text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm md:text-base font-semibold hover:bg-[#0b1630] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0f1b3a] focus:ring-offset-2 order-3 sm:order-none">
            COMPROBAR LA DISPONIBILIDAD
          </button>
        </div>
      </div>
    </footer>
  );
}
