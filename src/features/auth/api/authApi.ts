import { baseApi } from '@/src/shared/api/baseApi'
import { URL, apiEndpoints } from '@/src/shared/constants/api'

import { RegisterInput, RegistrationEmailResendingInput } from '../model/types/auth'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    registerUser: builder.mutation<void, RegisterInput>({
      query(data) {
        return {
          body: { ...data, baseUrl: URL },
          method: 'POST',
          url: apiEndpoints.auth.registration,
        }
      },
    }),

    registrationEmailResending: builder.mutation<void, RegistrationEmailResendingInput>({
      query(data) {
        return {
          body: { ...data, baseUrl: URL },
          method: 'POST',
          url: apiEndpoints.auth.registrationEmailResending,
        }
      },
    }),
  }),
})

export const { useRegisterUserMutation, useRegistrationEmailResendingMutation } = authApi
