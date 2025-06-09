import * as z from 'zod'

export function VehiculoSchema() {
  return z.object({
    matricula: z.string({ message: 'Requerido' })
      .min(4, 'Al menos 8 characters'),
    consumo: z.number().min(1, 'Tiene que ser positivo').optional(),
    capacidad: z.number().int('La capacidad es un numero entero').min(1, 'Tiene que ser positivo').optional(),
    marca: z.string().optional(),
    modelo: z.string().optional(),
    año: z.number().min(0, 'Tiene que ser positivo').optional(),
  })
}
