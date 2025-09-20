export interface UserDTO {
  name: string
  email: string
  address: string
  phone: string
  password: string
}

export interface UserDAO extends UserDTO {
  id_user: number | string
  state_id: number | string
}