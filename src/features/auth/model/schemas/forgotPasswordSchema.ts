import { LocaleType } from '@/src/shared/locales/ru'
import { z } from 'zod'

export const ForgotPasswordSchema = (t: LocaleType) => {
  return z.object({
    email: z
      .string()
      .trim()
      .nonempty(t.pages.forgotPassword.nonEmpty)
      .email(t.pages.forgotPassword.invalidEmail),
    recaptcha: z.literal(true),
  })
}
export type PasswordRecovery = z.infer<ReturnType<typeof ForgotPasswordSchema>>
