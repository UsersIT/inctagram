import { LocaleType } from '@/src/shared/locales/ru'
import { z } from 'zod'

export function newPasswordSchema(t: LocaleType) {
  return z
    .object({
      newPassword: z
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
      recoveryCode: z.string(),
    })
    .refine(({ newPassword, passwordConfirm }) => newPassword == passwordConfirm, {
      message: t.validation.passwordConfirmation,
      path: ['passwordConfirm'],
    })
    .refine(
      ({ newPassword, passwordConfirm }) => {
        if (passwordConfirm) {
          return newPassword == passwordConfirm
        }

        return true
      },
      {
        message: t.validation.passwordConfirmation,
        path: ['newPassword'],
      }
    )
}

export type newPassword = z.infer<ReturnType<typeof newPasswordSchema>>
