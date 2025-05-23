export interface UsuariosResponse {
  data: Usuario[]
  count: number
  pages: number
}

export interface Usuario {
  id: string
  carnet: string
  correo: string
  fullName: string
  nombre_u: string
  telefono: string
  isActive: boolean
  roles: string[]
}
