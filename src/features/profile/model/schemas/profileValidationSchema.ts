import { z } from 'zod'

// TODO: Переименовать, дополнить остальными полями
export const profileValidationSchema = z.object({
  city: z.string().nullable(),
})

export type ProfileFormValues = z.infer<typeof profileValidationSchema>
