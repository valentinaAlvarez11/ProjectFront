"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useRegisterForm from "@/hooks/useRegisterForm";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import SocialButton from "./SocialButton";
import Button from "../atoms/ButtonAuth";
import Separator from "../atoms/Separator";
import { formSuccessText } from "@/utils/Tokens";
import ErrorModal from "./ErrorModal";
import { useModal } from "@/hooks/useModal";

export default function RegisterComponent() {
  const router = useRouter();
  const errorModal = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    submit,
    serverError,
    successMessage,
  } = useRegisterForm({
    onSuccess: () => {
      router.push('/login');
    },
  });

  // Mostrar modal de error cuando hay un error del servidor
  useEffect(() => {
    if (serverError) {
      errorModal.open();
    }
  }, [serverError, errorModal]);

  const onSubmit = handleSubmit(submit);

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-5">
        <FormField
          label="Email"
          register={register("email")}
          error={errors.email}
          type="email"
          id="email"
          placeholder="mail@example.com"
        />

        <FormField
          label="Teléfono"
          register={register("telefono")}
          error={errors.telefono}
          type="text"
          id="telefono"
          placeholder="1234567890"
        />

        <FormField
          label="Nombre"
          register={register("nombre")}
          error={errors.nombre}
          type="text"
          id="nombre"
          placeholder="Tu nombre"
        />
        
        <PasswordField
          label="Contraseña"
          register={register("contraseña")}
          error={errors.contraseña}
          id="contraseña"
          placeholder="Password"
        />

        {successMessage && (
          <p className={formSuccessText}>{successMessage}</p>
        )}

        <Button
          type="submit"
          variant="register"
          className="mt-4"
        >
          Register
        </Button>

        <Separator />

        <SocialButton />
      </form>

      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={errorModal.close}
        title="Error en el Registro"
        message={serverError || "Ocurrió un error al intentar registrarse"}
      />
    </>
  );
}

