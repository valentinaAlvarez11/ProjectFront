// components/ContactCard.tsx
import Image from "next/image";
import contactImage from "../../app/assets/contact.avif"; // 🔹 Ajusta la ruta a tu imagen

export default function ContactCard() {
  return (
    <div className="bg-white shadow-xl rounded-1g overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
      {/* Columna izquierda - Formulario */}
      <div className="w-full md:w-2/5 bg-gray-100 p-6 md:p-7 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-center text-[#0f1b3a] mb-6">
          Contacto
        </h2>

        <form className="space-y-4 text-sm">
          {/* Nombre y Apellidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Apellidos</label>
              <input
                type="text"
                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent"
              />
            </div>
          </div>

          {/* Teléfono y Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent"
              />
            </div>
          </div>

          {/* Asunto */}
          <div>
            <label className="block text-gray-700 mb-1">Asunto</label>
            <input
              type="text"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent"
            />
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-gray-700 mb-1">Escribe tu mensaje aquí</label>
            <textarea
              rows={3}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent resize-none"
            />
          </div>

          {/* Botón */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#0f1b3a] text-white px-6 py-2 rounded-md hover:bg-[#0b1630] transition"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

      {/* Columna derecha - Imagen */}
      <div className="w-full md:w-3/5 relative">
        <Image
          src={contactImage}
          alt="Atención al cliente"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
