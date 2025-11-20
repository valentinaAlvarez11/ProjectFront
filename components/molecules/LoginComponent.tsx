"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import InputComponents from "../atoms/InputComponents";
import { ILoginPayload } from "@/interfaces/users"; 
import { loginScheme } from "@/schemas/login";
import AuthService from "@/libs/auth.service"; 
import { useAuthStore } from "@/store/authStore";

type LoginFormData = { email: string; password: string; };


export default function LoginComponent() {
  const loginStoreAction = useAuthStore((state) => state.login);
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginScheme),
  });

  const mapToPayload = (data: LoginFormData): ILoginPayload => ({
      email: data.email,
      contraseña: data.password,
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
        const payload = mapToPayload(data);
        const response = await AuthService.login(payload); 

        loginStoreAction(response.usuario); 
        router.push('/'); 
            
    } catch (err: unknown) {
        const errorMessage = (err as Error)?.message || "Error de conexión o credenciales incorrectas.";
        console.error("Error en solicitud:", errorMessage);
        alert(errorMessage);
    }
  };

  const onErrors = () => {
    console.log("Errores", errors);

    alert("Informacion incompleta");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
      <div>
        <InputComponents
          label="Introduce el email" // Corregir label a email
          typeElement="text"
          idElement="email"
          nameRegister="email" // ⚠️ CORRECCIÓN: El campo debe ser 'email'
          // register={register('email')} si se usara el hook completo
        />
      </div>
      <div>
        <InputComponents
          label="Introduce la contraseña"
          typeElement="password"
          idElement="password"
          nameRegister="password" // ⚠️ CORRECCIÓN: El campo debe ser 'password'
          // register={register('password')}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-medium py-2 rounded-lg transition"
      >
        Continuar
      </button>
    </form>
  );
}