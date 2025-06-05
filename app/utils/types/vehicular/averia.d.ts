export interface AveriaResponse {
  data: Averia[]
  count: number
  pages: number
}

export interface Averia {
  id: string
  complejidad: string
  descripcion: string
  tipo: string | null
  piezas_necesarias: string | null
  vehiculo: Vehiculo
}

export interface Vehiculo {
  id: string
  matricula: string
  consumo: string
  capacidad: string
  marca: string
  modelo: string
  año: string
}
