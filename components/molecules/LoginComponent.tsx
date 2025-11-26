"use client";
<<<<<<< HEAD

import { useRouter } from 'next/navigation';
import useLoginForm from "@/hooks/useLoginForm";
import { useAuthStore } from "@/store/authStore";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import SocialButton from "./SocialButton";
import Button from "../atoms/ButtonAuth";
import TextLink from "../atoms/TextLink";
import Separator from "../atoms/Separator";
import { formFieldContainer, formLabel, formErrorTextCenter, formSuccessText, loginTextLinkSmall } from "@/utils/Tokens";

export default function LoginComponent() {
  const router = useRouter();
  const { user } = useAuthStore();

=======
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputComponents from "../atoms/InputComponents";
import ButtonComponent from "../atoms/ButtonComponent";

import { LoginDTO } from "@/interfaces/login";
import { loginScheme } from "@/schemas/login";

import { loginService } from "@/libs/authService";

export default function LoginComponent() {
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a
  const {
    register,
    handleSubmit,
    formState: { errors },
<<<<<<< HEAD
    submit,
    serverError,
    successMessage,
  } = useLoginForm({
    onSuccess: () => {
      // Verificar el rol del usuario después del login
      // Usar setTimeout para asegurar que el store se haya actualizado
      setTimeout(() => {
        const currentUser = useAuthStore.getState().user;
        if (currentUser?.rol === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      }, 100);
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

      {serverError && (
        <p className={formErrorTextCenter}>{serverError}</p>
      )}

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
  );
}
=======
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginScheme),
  });

  const onSubmit: SubmitHandler<LoginDTO> = (data) => {
    loginService(data)
      .then((info: any) => {
        if (info.access_token) {
          localStorage.setItem("token", info.access_token);
        } else if (info.token) {
          localStorage.setItem("token", info.token);
        }
      })
      .catch(() => {
        console.error("Error en solicitud");
      });
  };

  const onErrors = () => {
    console.log("Errores", errors);
    alert("Informacion incompleta");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
      <InputComponents
        label="Introduce el usuario"
        typeElement="text"
        idElement="user"
        register={register("user")}
        error={errors.user?.message}
        required
      />
      <InputComponents
        label="Introduce la contraseña"
        typeElement="password"
        idElement="password"
        register={register("password")}
        error={errors.password?.message}
        required
      />
      <ButtonComponent
        type="submit"
        variant="primary"
        fullWidth
        className="bg-yellow-400 hover:bg-yellow-300 text-black"
      >
        Continuar
      </ButtonComponent>
    </form>
  );
}
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a
