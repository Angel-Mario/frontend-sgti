export interface PuntosRefRespone {
  data: PuntoRef[]
  count: number
  pages: number
}

export interface PuntoRef {
  id: number
  nombre: string
  latLong: string
  usage: Usage
}
export interface Usage {
  rutas: string[]
  terminales: string[]
  puntos_combustible: string[]
}
