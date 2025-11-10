// components/ContactCard.tsx
"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import contactImage from "../../app/assets/contact.avif";
import FormField from "../atoms/FormField";
import InputComponents from "../atoms/InputComponents";
import ButtonComponent from "../atoms/ButtonComponent";

export default function ContactCard() {
  const { register, formState: { errors } } = useForm();

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
      {/* Columna izquierda - Formulario */}
      <div className="w-full md:w-2/5 bg-gray-100 p-6 md:p-7 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-center text-[#0f1b3a] mb-6">
          Contacto
        </h2>

        <form className="space-y-4 text-sm">
          {/* Nombre y Apellidos */}
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
              />
              {errors.apellidos && (
                <p className="text-red-500 text-sm mt-1">{errors.apellidos.message as string}</p>
              )}
            </FormField>
          </div>

          {/* Teléfono y Email */}
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
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
              )}
            </FormField>
          </div>

          {/* Asunto */}
          <FormField label="Asunto" required>
            <input
              type="text"
              {...register("asunto", { required: "El asunto es requerido" })}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent"
            />
            {errors.asunto && (
              <p className="text-red-500 text-sm mt-1">{errors.asunto.message as string}</p>
            )}
          </FormField>

          {/* Mensaje */}
          <FormField label="Escribe tu mensaje aquí" required>
            <textarea
              rows={3}
              {...register("mensaje", { required: "El mensaje es requerido" })}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#0f1b3a] bg-transparent resize-none"
            />
            {errors.mensaje && (
              <p className="text-red-500 text-sm mt-1">{errors.mensaje.message as string}</p>
            )}
          </FormField>

          {/* Botón */}
          <div className="flex justify-center">
            <ButtonComponent type="submit" variant="secondary">
              Enviar
            </ButtonComponent>
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
