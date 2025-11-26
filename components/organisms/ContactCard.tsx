// components/ContactCard.tsx
"use client";
import Image from "next/image";
<<<<<<< HEAD
import contactImage from "../../assets/contact.avif"; // 🔹 Ajusta la ruta a tu imagen
=======
import { useForm } from "react-hook-form";
import contactImage from "../../app/assets/contact.avif";
import FormField from "../atoms/FormField";
import InputComponents from "../atoms/InputComponents";
import ButtonComponent from "../atoms/ButtonComponent";
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a

export default function ContactCard() {
  const { register, formState: { errors } } = useForm();

  return (
<<<<<<< HEAD
    <div className="bg-white shadow-xl rounded-lg sm:rounded-xl overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
=======
    <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a
      {/* Columna izquierda - Formulario */}
      <div className="w-full md:w-2/5 bg-gray-100 p-4 sm:p-6 md:p-7 flex flex-col justify-center order-2 md:order-1">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-[#0f1b3a] mb-4 sm:mb-6">
          Contacto
        </h2>

        <form className="space-y-3 sm:space-y-4 text-sm">
          {/* Nombre y Apellidos */}
<<<<<<< HEAD
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
=======
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Nombre" required>
              <input
                type="text"
                {...register("nombre", { required: "El nombre es requerido" })}
                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent"
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre.message as string}</p>
              )}
            </FormField>
            <FormField label="Apellidos" required>
              <input
                type="text"
                {...register("apellidos", { required: "Los apellidos son requeridos" })}
                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent"
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a
              />
              {errors.apellidos && (
                <p className="text-red-500 text-sm mt-1">{errors.apellidos.message as string}</p>
              )}
            </FormField>
          </div>

          {/* Teléfono y Email */}
<<<<<<< HEAD
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
=======
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Teléfono" required>
              <input
                type="tel"
                {...register("telefono", { required: "El teléfono es requerido" })}
                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent"
              />
              {errors.telefono && (
                <p className="text-red-500 text-sm mt-1">{errors.telefono.message as string}</p>
              )}
            </FormField>
            <FormField label="Email" required>
              <input
                type="email"
                {...register("email", { 
                  required: "El email es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido"
                  }
                })}
                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent"
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
              )}
            </FormField>
          </div>

          {/* Asunto */}
<<<<<<< HEAD
          <div>
            <label className="block text-gray-700 mb-1 text-xs sm:text-sm">Asunto</label>
            <input
              type="text"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent py-1.5 sm:py-2 text-sm sm:text-base"
              placeholder="Asunto del mensaje"
=======
          <FormField label="Asunto" required>
            <input
              type="text"
              {...register("asunto", { required: "El asunto es requerido" })}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent"
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a
            />
            {errors.asunto && (
              <p className="text-red-500 text-sm mt-1">{errors.asunto.message as string}</p>
            )}
          </FormField>

          {/* Mensaje */}
<<<<<<< HEAD
          <div>
            <label className="block text-gray-700 mb-1 text-xs sm:text-sm">Escribe tu mensaje aquí</label>
            <textarea
              rows={3}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent resize-none py-1.5 sm:py-2 text-sm sm:text-base"
              placeholder="Tu mensaje..."
=======
          <FormField label="Escribe tu mensaje aquí" required>
            <textarea
              rows={3}
              {...register("mensaje", { required: "El mensaje es requerido" })}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent resize-none"
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a
            />
            {errors.mensaje && (
              <p className="text-red-500 text-sm mt-1">{errors.mensaje.message as string}</p>
            )}
          </FormField>

          {/* Botón */}
<<<<<<< HEAD
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="bg-[#0f1b3a] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-md hover:bg-[#0b1630] transition-colors duration-200 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#0f1b3a] focus:ring-offset-2 w-full sm:w-auto"
            >
=======
          <div className="flex justify-center">
            <ButtonComponent type="submit" variant="secondary">
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a
              Enviar
            </ButtonComponent>
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
