export interface User {
  carnet: string
  correo: string
  fullName: string
  id: string
  isActive: boolean
  nombre_u: string
  roles: string[]
  telefono: string
  // Add other user properties as needed
}

export interface AuthTokens {
  token: string
}

export interface LoginCredentials {
  nombre_u: string
  password: string
}

export interface AuthChofer {
  id: string
  residencia: string
  vehiculo: AuthVehiculo
  ruta: AuthRuta
}

interface AuthRuta {
  id: string
  nombre: string
  distancia: string
  hora_salida: string
  hora_regreso: string
  puntoSalida: AuthPunto
  puntoRegreso: AuthPunto
}

interface AuthPunto {
  id: number
  nombre: string
  latLong: string
}

interface AuthVehiculo {
  id: string
  matricula: string
  consumo: string
  capacidad: string
  marca: string
  modelo: string
  año: string
}

export interface AuthState {
  user: User | null
  token: string | null
  chofer: AuthChofer | null
  apiUrl: string
}
