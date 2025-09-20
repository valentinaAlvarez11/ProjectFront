'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import InputComponents from "../atoms/InputComponents"

import { LoginDTO } from "@/interfaces/login"
import { loginScheme } from "@/schemas/login"

import { loginService } from "@/libs/authService"

import { standardInput } from "@/utils/Tokens"

export default function LoginComponent() {

  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginScheme)
  })
  
  const onSubmit: SubmitHandler<LoginDTO> = (data) => {
    loginService(data)
    .then((info) => {
      localStorage.setItem('token', info.access_token)
    })
    .catch(e => {
      console.error('Error en solicitud');
    })
  }

  const onErrors = () => {
    console.log('Errores', errors);
    
    alert('Informacion incompleta')
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
      <div>
        <InputComponents 
          label="Introduce el usuario"
          typeElement="text"
          idElement="email"
          nameRegister="user"
        />
      </div>
      <div>
        <InputComponents 
          label="Introduce la contraseña"
          typeElement="password"
          idElement="password"
          nameRegister="password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-medium py-2 rounded-lg transition"
      >
        Continuar
      </button>
    </form>
  )
}
