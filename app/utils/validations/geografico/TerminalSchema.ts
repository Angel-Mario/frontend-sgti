import * as z from 'zod'

export function TerminalSchema() {
  return z.object({
    nombre: z.string({ message: 'Requerido' }).min(4, 'Al menos 4 caracteres'),

    puntoRef: z.string(),
  })
}
