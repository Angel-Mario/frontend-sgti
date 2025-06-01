export interface SolicitudesPiezasResponse {
  data: SolicitudPieza[]
  count: number
  pages: number
}

export interface SolicitudPieza {
  id: string
  tipo: string
  cantidad: string
  estado: 'pendiente' | 'aceptado' | 'rechazado'
  chofer: SolicitudPiezaChofer
}

export interface SolicitudPiezaChofer {
  id: string
  residencia: string
  vehiculo: SolicitudPiezaVehiculo
  user: SolicitudPiezaUser
}

export interface SolicitudPiezaUser {
  id: string
  carnet: string
  correo: string
  fullName: string
  nombre_u: string
  telefono: null
  isActive: boolean
  roles: string[]
}

export interface SolicitudPiezaVehiculo {
  id: string
  matricula: string
  consumo: string
  capacidad: string
  marca: string
  modelo: string
  año: string
}
