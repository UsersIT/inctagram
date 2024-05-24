import { LocaleType } from '@/src/shared/locales/ru'
import { z } from 'zod'

export const loginValidationSchema = (t: LocaleType) =>
  z.object({
    email: z.string().trim().email({ message: t.validation.emailVerification }),
    password: z.string().min(1, { message: t.validation.required }).trim(),
  })

export type SignInFormValues = z.infer<ReturnType<typeof loginValidationSchema>>
