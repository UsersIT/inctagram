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
    city: z.string().nullable().optional(),
    dateOfBirth: z
      .date()
      .max(new Date(), { message: t.validation.maxDate })
      .refine(
        date => {
          const today = new Date()
          const minDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate())

          return date <= minDate
        },
        {
          message: t.validation.ageRestriction,
        }
      )
      .optional()
      .nullable(),
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

export type GeneralInfoFormValues = z.infer<ReturnType<typeof generalInfoValidationSchema>>
