import * as z from 'zod'

export function SolicitudRefuerzoSchema() {
  return z.object({
    terminalNombre: z.string({ message: 'Requerido' }),
    vehiculosMatriculas: z.array(z.string().min(1)).nonempty(),
  },
  )
}
