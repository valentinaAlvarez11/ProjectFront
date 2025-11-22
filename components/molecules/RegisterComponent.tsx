"use client";

import { useRouter } from 'next/navigation';
import useRegisterForm from "@/hooks/useRegisterForm";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import SocialButton from "./SocialButton";
import Button from "../atoms/ButtonAuth";
import Separator from "../atoms/Separator";
import { formErrorTextCenter, formSuccessText } from "@/utils/Tokens";

export default function RegisterComponent() {
  const router = useRouter();

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

  const onSubmit = handleSubmit(submit);

  return (
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

      {serverError && (
        <p className={formErrorTextCenter}>{serverError}</p>
      )}

      {successMessage && (
        <p className={formSuccessText}>{successMessage}</p>
      )}

      <Button
        type="submit"
        variant="light"
        className="mt-4"
      >
        Register
      </Button>

      <Separator />

      <SocialButton />
    </form>
  );
}

