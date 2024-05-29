import { LocaleType } from '@/src/shared/locales/ru'
import { z } from 'zod'

export function newPasswordSchema(t: LocaleType) {
  return z
    .object({
      password: z
        .string()
        .trim()
        .nonempty(t.validation.passwordConfirmation)
        .regex(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@\\[\]^_`{|}〜])[a-zA-Z\d!"#$%&'()*+,-./:;<=>?@\\[\]^_`{|}〜]+$/,
          t.validation.passwordVerification
        )
        .min(6, t.pages.createNewPassword.instruction)
        .max(20, t.pages.createNewPassword.instruction),
      passwordConfirm: z.string().nonempty(t.validation.passwordConfirmation),
    })
    .refine(({ password, passwordConfirm }) => password == passwordConfirm, {
      message: t.validation.passwordConfirmation,
      path: ['passwordConfirm'],
    })
    .refine(
      ({ password, passwordConfirm }) => {
        if (passwordConfirm) {
          return password == passwordConfirm
        }

        return true
      },
      {
        message: t.validation.passwordConfirmation,
        path: ['password'],
      }
    )
}

export type newPassword = z.infer<ReturnType<typeof newPasswordSchema>>
