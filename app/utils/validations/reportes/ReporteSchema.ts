import * as z from 'zod'

export function ReporteSchema() {
  return z.object({
    asunto: z.string({ message: 'Requerido' }),
    texto: z.string({ message: 'Requerido' }),
  },
  )
}
