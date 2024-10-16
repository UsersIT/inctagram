import { EMAIL_PATTERN } from '@/src/shared/constants/regexs'
import { LocaleType } from '@/src/shared/locales/ru'
import { z } from 'zod'

export const loginValidationSchema = (t: LocaleType) =>
  z.object({
    email: z.string().trim().regex(EMAIL_PATTERN, { message: t.validation.emailFormat }),
    password: z.string().min(1, { message: t.validation.required }).trim(),
  })

export type LoginFormValues = z.infer<ReturnType<typeof loginValidationSchema>>
