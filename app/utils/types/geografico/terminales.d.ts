export interface TerminalesResponse {
  data: Terminal[]
  count: number
  pages: number
}

export interface Terminal {
  id: number
  nombre: string
  puntoRef: TerminalPuntoRef
}

export interface TerminalPuntoRef {
  id: number
  nombre: string
  latLong: string
}
