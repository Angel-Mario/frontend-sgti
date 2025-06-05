export interface ChoferResponse {
  data: Chofer[]
  count: number
  pages: number
}

export interface Chofer {
  id: string
  vehiculo: ChoferVehiculo | null
  ruta: ChoferRuta | null
  residencia: null | string
  carnet: string
  correo: string
  fullName: string
  nombre_u: string
  telefono: null
  isActive: boolean
}

export interface ChoferRuta {
  id: string
  nombre: string
  distancia: string
  hora_salida: string
  hora_regreso: string
}

export interface ChoferVehiculo {
  id: string
  matricula: string
  consumo: string
  capacidad: string
  marca: string
  modelo: null | string
  año: null | string
}
