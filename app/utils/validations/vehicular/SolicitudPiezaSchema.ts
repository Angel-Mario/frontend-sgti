import * as z from 'zod'

export function SolicitudPiezaSchema() {
  return z.object({
    tipo: z.string({ message: 'Requerido' }),
    cantidad: z.number().min(0, 'Tiene que ser positivo'),
  },
  )
}
