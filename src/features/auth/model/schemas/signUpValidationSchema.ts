import { EMAIL_PATTERN, PASSWORD_PATTERN, USERNAME_PATTERN } from '@/src/shared/constants/regexs'
import { LocaleType } from '@/src/shared/locales/ru'
import { z } from 'zod'

const PASSWORD_VERIVICATION = '! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'

export const signUpValidationSchema = (t: LocaleType) =>
  z
    .object({
      agreement: z.boolean(),
      email: z
        .string()
        .trim()
        .regex(EMAIL_PATTERN, { message: t.validation.emailFormat })
        .max(320, { message: t.validation.maxLength(320) }),
      password: z
        .string()
        .trim()
        .min(6, { message: t.validation.minLength(6) })
        .max(20, { message: t.validation.maxLength(20) })
        .regex(PASSWORD_PATTERN, {
          message: t.validation.passwordVerification + PASSWORD_VERIVICATION,
        }),
      passwordConfirmation: z.string().trim(),
      userName: z
        .string()
        .trim()
        .regex(USERNAME_PATTERN, {
          message: t.validation.userNameVerification,
        })
        .min(6, { message: t.validation.minLength(6) })
        .max(30, { message: t.validation.maxLength(30) }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.passwordConfirmation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t.validation.passwordConfirmation,
          path: ['passwordConfirmation'],
        })
      }
      if (data.agreement !== true) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['agreement'],
        })
      }
    })

export type SignUpFormValues = z.infer<ReturnType<typeof signUpValidationSchema>>
