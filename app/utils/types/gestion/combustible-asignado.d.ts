export interface CombustibleAsignadoChoferResponse {
  data: CombustibleAsignado[]
  count: number
  pages: number
}

export interface CombustibleAsignado {
  id: string
  litros: number
  chofer: CombustibleAsignadoChofer
  punto_combustible: PuntoCombustible
}

export interface CombustibleAsignadoChofer {
  id: string
  user: CombustibleAsignadoUser
  vehiculo: Omit<Vehiculo, 'chofer'> | null
}

export interface CombustibleAsignadoPuntoCombustible {
  id: number
  nombre: string
  puntoRef: PuntoRef
}

export interface CombustibleAsignadoPuntoRef {
  latLong: string
}

export interface CombustibleAsignadoUser {
  carnet: string
  fullName: string
}
