import { LocaleType } from '@/src/shared/locales/ru'
import { z } from 'zod'

export const citiesApiResultSchema = z.object({
  city: z.string(),
  hamlet: z.string().optional(),
})

export const citiesQuerySchema = (t: LocaleType) =>
  z.object({
    query: z
      .string()
      .regex(/^(?!-)[a-zA-Zа-яА-ЯёЁ\s-]*(?<!-)$/, t.validation.cityQuery)
      .max(60, t.validation.maxLength(60))
      .optional(),
  })

export type CitiesApiResult = z.infer<typeof citiesApiResultSchema>
