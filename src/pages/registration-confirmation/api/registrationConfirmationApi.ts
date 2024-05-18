import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

import { ConfirmationCodeInput } from '../model/types/confirnationCode'

export const registrationConfirmationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    registrationConfirmation: builder.mutation<void, ConfirmationCodeInput>({
      query(data) {
        return {
          body: data,
          method: 'POST',
          url: apiEndpoints.auth.registrationConfirmation,
        }
      },
    }),
  }),
})

export const { useRegistrationConfirmationMutation } = registrationConfirmationApi
