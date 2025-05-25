export interface PuntosCombResponse {
  data: PuntoComb[]
  count: number
  pages: number
}

export interface PuntoComb {
  id: number
  nombre: string
  puntoRef: PuntoCombPuntoRef
}

export interface PuntoCombPuntoRef {
  id: number
  nombre: string
  latLong: string
}
