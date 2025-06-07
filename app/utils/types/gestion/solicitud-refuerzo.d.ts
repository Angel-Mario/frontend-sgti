export interface SolicitudRefuerzoResponse {
  data: SolicitudRefuerzo[]
  count: number
  pages: number
}

export interface SolicitudRefuerzo {
  id: string
  estado: string
  fecha: null
  terminal: SolicitudRefuerzoTerminal
  vehiculos: SolicitudRefuerzoVehiculo[]
  capacidadTotal: number
}

export interface SolicitudRefuerzoTerminal {
  id: number
  nombre: string
}

export interface SolicitudRefuerzoVehiculo {
  id: string
  matricula: string
  consumo: number
  capacidad: number
  marca: string
  modelo: string
  año: number
}
