import * as z from 'zod'

export function ReporteSchema() {
  return z.object({
    descripcion: z.string({ message: 'Requerido' }),
  },
  )
}
