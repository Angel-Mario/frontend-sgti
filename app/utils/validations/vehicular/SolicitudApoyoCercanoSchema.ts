import * as z from 'zod'

export function SolicitudApoyoCercanoSchema() {
  return z.object({
    descripcion: z.string({ message: 'Requerido' }).min(4, 'Al menos 4 caracteres'),
    latLong: LatLongSchema,
  })
}
