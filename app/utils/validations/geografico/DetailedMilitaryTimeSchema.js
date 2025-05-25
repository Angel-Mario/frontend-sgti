import { z } from 'zod'

// Esquema para validar hora militar
export const DetailedMilitaryTimeSchema = z.string()
  .min(5, 'Time must be 5 characters (HH:MM)')
  .max(5, 'Time must be 5 characters (HH:MM)')
  .refine(time => time.includes(':'), {
    message: 'Time must contain a colon separator',
  })
  .refine((time) => {
    const [hours, minutes] = time.split(':')
    if (hours && minutes)
      return hours.length === 2 && minutes.length === 2
  }, {
    message: 'Hours and minutes must each be 2 digits',
  })
  .refine((time) => {
    let [hours] = time.split(':').map(Number)
    if (!hours)
      hours = 0
    return hours >= 0 && hours <= 23
  }, {
    message: 'Hours must be between 00 and 23',
  })
  .refine((time) => {
    let [minutes] = time.split(':').map(Number)
    if (!minutes)
      minutes = 0
    return minutes >= 0 && minutes <= 59
  }, {
    message: 'Minutes must be between 00 and 59',
  })
