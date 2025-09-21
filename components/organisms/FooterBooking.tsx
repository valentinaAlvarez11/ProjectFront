// components/FooterBooking.tsx
export default function FooterBooking() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4 gap-4">
        {/* Texto */}
        <div className="flex items-center gap-2 font-bold text-gray-700">
          <span className="uppercase">Reservar</span>
          <span className="font-normal">Online</span>
        </div>

        {/* Formulario */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Check-in */}
          <div className="flex flex-col text-sm">
            <label className="text-gray-500">Check-in</label>
            <input
              type="date"
              className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>

          {/* Check-out */}
          <div className="flex flex-col text-sm">
            <label className="text-gray-500">Check-out</label>
            <input
              type="date"
              className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>

          {/* Botón */}
          <button className="bg-blue-900 text-white px-6 py-3 rounded hover:bg-blue-800 transition">
            Comprobar la disponibilidad
          </button>
        </div>
      </div>
    </footer>
  );
}
