export interface RutasResponse {
  data: Ruta[]
  count: number
  pages: number
}

export interface Ruta {
  id: string
  nombre: string
  distancia: number
  hora_salida: string
  hora_regreso: string
  puntoSalida: RutaPunto
  puntoRegreso: RutaPunto
}

export interface RutaPunto {
  id: number
  nombre: string
  latLong: string
}
