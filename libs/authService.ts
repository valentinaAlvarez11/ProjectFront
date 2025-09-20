import { apiFetch } from "./singletonFetch"

import { LoginDTO } from "@/interfaces/login"

export const loginService = (body: LoginDTO) => {
  return apiFetch('/auth/login', 'POST', body)
}