export interface SuministradorResponse {
  data: Suministrador[]
  count: number
  pages: number
}

export interface Suministrador {
  id: string
  carnet: string
  cargo: string
  correo: string
  fullName: string
  nombre_u: string
  telefono: string
  isActive: boolean
}
