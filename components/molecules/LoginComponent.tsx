"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useLoginForm from "@/hooks/useLoginForm";
import { useAuthStore } from "@/store/authStore";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import SocialButton from "./SocialButton";
import Button from "../atoms/ButtonAuth";
import TextLink from "../atoms/TextLink";
import Separator from "../atoms/Separator";
import { formFieldContainer, formLabel, formSuccessText, loginTextLinkSmall } from "@/utils/Tokens";
import ErrorModal from "./ErrorModal";
import { useModal } from "@/hooks/useModal";

export default function LoginComponent() {
  const router = useRouter();
  const { user } = useAuthStore();
  const errorModal = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    submit,
    serverError,
    successMessage,
    clearServerError,
  } = useLoginForm({
    onSuccess: () => {
      // Verificar el rol del usuario después del login
      // Usar setTimeout para asegurar que el store se haya actualizado
      setTimeout(() => {
        const currentUser = useAuthStore.getState().user;
        // Todos los usuarios van al home, el AdminHome se muestra automáticamente si es admin
        router.push('/');
      }, 100);
    },
  });

  // Mostrar modal de error cuando hay un error del servidor
  useEffect(() => {
    if (serverError) {
      errorModal.open();
    }
  }, [serverError, errorModal]);

  const handleCloseError = () => {
    errorModal.close();
    clearServerError();
  };

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
        
        <div className={formFieldContainer}>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className={formLabel}>
              Password
            </label>
            <TextLink href="/forgot-password" className={loginTextLinkSmall}>
              Forgot your password?
            </TextLink>
          </div>
          <PasswordField
            label=""
            register={register("password")}
            error={errors.password}
            id="password"
            placeholder="Password"
          />
        </div>

        {successMessage && (
          <p className={formSuccessText}>{successMessage}</p>
        )}

        <Button
          type="submit"
          variant="register"
          className="mt-4"
        >
          Login
        </Button>

        <Separator />

        <SocialButton />
      </form>

      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={handleCloseError}
        title="Error en el Inicio de Sesión"
        message={serverError || "Ocurrió un error al intentar iniciar sesión"}
      />
    </>
  );
}