import { FIRSTNAME_AND_LASTNAME_PATTERN, USERNAME_PATTERN } from '@/src/shared/constants/regexs'
import { LocaleType } from '@/src/shared/locales/ru'
import { z } from 'zod'

export const generalInfoValidationSchema = (t: LocaleType) =>
  z.object({
    aboutMe: z
      .string()
      .trim()
      .min(0)
      .max(200, { message: t.validation.maxLength(200) }),
    city: z.string().optional(),
    dateOfBirth: z.string().datetime({ message: t.validation.invalidDate }).optional(),
    firstName: z
      .string()
      .trim()
      .min(1, { message: t.validation.required })
      .max(50, { message: t.validation.maxLength(50) })
      .regex(FIRSTNAME_AND_LASTNAME_PATTERN, {
        message: t.validation.onlyLetters,
      }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: t.validation.required })
      .max(50, { message: t.validation.maxLength(50) })
      .regex(FIRSTNAME_AND_LASTNAME_PATTERN, {
        message: t.validation.onlyLetters,
      }),
    userName: z
      .string()
      .trim()
      .min(6, { message: t.validation.minLength(6) })
      .max(30, { message: t.validation.maxLength(30) })
      .regex(USERNAME_PATTERN, {
        message: t.validation.userNameVerification,
      }),
  })

export type generalInfoFormValues = z.infer<ReturnType<typeof generalInfoValidationSchema>>
