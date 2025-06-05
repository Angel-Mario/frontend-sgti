export interface ReporteResponse {
  data: Datum[]
  count: number
  pages: number
}

export interface Reporte {
  id: string
  fecha: Date
  asunto: string
  texto: string
}
