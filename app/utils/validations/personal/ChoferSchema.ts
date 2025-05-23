import * as z from 'zod'

export function ChoferSchema(update = false) {
  const password = z
    .string({ message: 'Requerido' })
    .min(8, 'Al menos 8 characters')
    .regex(
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Al menos un número, una letra mayúscula y una letra minúscula',
    )

  return z.object({
    nombre_u: z
      .string({ message: 'Requerido' })
      .min(4, 'Al menos 4 caracteres')
      .regex(/^[a-z]+$/, 'Solo letras minúsculas'),
    fullName: z
      .string({ message: 'Requerido' })
      .min(5, 'Al menos 5 caracteres'),
    carnet: z
      .string({ message: 'Requerido' })
      .min(11, 'Mínimo 11 dígitos')
      .max(11, 'Máximo 11 dígitos')
      .regex(/^[1-9]\d*/, { message: 'Solo dígitos' }),
    correo: z.string({ message: 'Requerido' }).email('No es un correo válido'),
    password: update ? password.optional() : password,
    telefono: z
      .string({ message: 'Requerido' })
      .length(8, {
        message: 'Debe tener 8 digitos',
      })
      .regex(/^\d+$/, { message: 'Solo dígitos' })
      .optional(),
    residencia: z.string().optional(),
    rutaNombre: z.string().optional(),
    vehiculoMatricula: z.string().optional(),
  })
}
