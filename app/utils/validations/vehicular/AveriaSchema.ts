import * as z from 'zod'

export function AveriaSchema() {
  return z.object({
    complejidad: z.string({ message: 'Requerido' }),
    descripcion: z.string({ message: 'Requerido' }),
    tipo: z.string().optional(),
    piezas_necesarias: z.string().optional(),
  },
  )
}
