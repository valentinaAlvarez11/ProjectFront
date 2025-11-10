"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputComponents from "../atoms/InputComponents";
import ButtonComponent from "../atoms/ButtonComponent";

import { LoginDTO } from "@/interfaces/login";
import { loginScheme } from "@/schemas/login";

import { loginService } from "@/libs/authService";

export default function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
