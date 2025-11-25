// components/ContactCard.tsx
import Image from "next/image";
import contactImage from "../../assets/contact.avif"; // 🔹 Ajusta la ruta a tu imagen

export default function ContactCard() {
  return (
    <div className="bg-white shadow-xl rounded-lg sm:rounded-xl overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
      {/* Columna izquierda - Formulario */}
      <div className="w-full md:w-2/5 bg-gray-100 p-4 sm:p-6 md:p-7 flex flex-col justify-center order-2 md:order-1">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-[#0f1b3a] mb-4 sm:mb-6">
          Contacto
        </h2>

        <form className="space-y-3 sm:space-y-4 text-sm">
          {/* Nombre y Apellidos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-gray-700 mb-1 text-xs sm:text-sm">Nombre</label>
              <input
                type="text"
                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent py-1.5 sm:py-2 text-sm sm:text-base"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-xs sm:text-sm">Apellidos</label>
              <input
                type="text"
                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent py-1.5 sm:py-2 text-sm sm:text-base"
                placeholder="Tus apellidos"
              />
            </div>
          </div>

          {/* Teléfono y Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-gray-700 mb-1 text-xs sm:text-sm">Teléfono</label>
              <input
                type="tel"
                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent py-1.5 sm:py-2 text-sm sm:text-base"
                placeholder="Tu teléfono"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-xs sm:text-sm">Email</label>
              <input
                type="email"
                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent py-1.5 sm:py-2 text-sm sm:text-base"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          {/* Asunto */}
          <div>
            <label className="block text-gray-700 mb-1 text-xs sm:text-sm">Asunto</label>
            <input
              type="text"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent py-1.5 sm:py-2 text-sm sm:text-base"
              placeholder="Asunto del mensaje"
            />
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-gray-700 mb-1 text-xs sm:text-sm">Escribe tu mensaje aquí</label>
            <textarea
              rows={3}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent resize-none py-1.5 sm:py-2 text-sm sm:text-base"
              placeholder="Tu mensaje..."
            />
          </div>

          {/* Botón */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="bg-[#0f1b3a] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-md hover:bg-[#0b1630] transition-colors duration-200 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#0f1b3a] focus:ring-offset-2 w-full sm:w-auto"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

      {/* Columna derecha - Imagen */}
      <div className="w-full md:w-3/5 relative h-48 sm:h-64 md:h-auto order-1 md:order-2">
        <Image
          src={contactImage}
          alt="Atención al cliente"
          className="object-cover w-full h-full"
          fill
        />
      </div>
    </div>
  );
}
