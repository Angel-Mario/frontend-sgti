export interface ReportarAveriaPage {
  chofer: Chofer
  averias: Averia[]
}

interface Chofer {
  id: string
  vehiculo: Vehiculo
}

interface Vehiculo {
  id: string
  matricula: string
  consumo: string
  capacidad: string
  marca: string
  modelo: string
  año: string
}

interface Averia {
  id: string
  complejidad: string
  descripcion: string
  tipo: null | string
  piezas_necesarias: null | string
}
