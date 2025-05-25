import * as z from 'zod'

export function RutaSchema() {
  return z.object({
    nombre: z.string({ message: 'Requerido' }).min(4, 'Al menos 4 caracteres'),
    distancia: z.number().min(0, 'La distancia debe ser positiva'),
    hora_salida: DetailedMilitaryTimeSchema,
    hora_regreso: DetailedMilitaryTimeSchema,
    puntoSalida: z.string(),
    puntoRegreso: z.string(),
  })
}
