export interface Vehiculo {
  año: undefined | number
  capacidad: number | undefined
  chofer: VehiculoChofer | null
  consumo: number | undefined
  id: string
  marca: string
  matricula: string
  modelo: undefined | string
}

export interface VehiculoChofer {
  id: string
}
