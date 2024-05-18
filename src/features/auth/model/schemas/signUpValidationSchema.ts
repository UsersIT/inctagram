import { LocaleType } from '@/src/shared/locales/ru'
import { z } from 'zod'

/**
 * The poassword must contain at least one uppercase letter, one lowercase letter, one number and one special character
 */
const PASSWORD_VERIVICATION =
  'a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'

const PASSWORD_PATTERN =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/

export const signUpValidationSchema = (t: LocaleType) =>
  z
    .object({
      agreement: z.boolean(),
      email: z.string().trim().email({ message: t.validation.emailFormat }),
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
