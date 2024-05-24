import { MeResponse } from '@/src/features/auth/model/types/auth'
import { baseApi } from '@/src/shared/api/baseApi'
import { URL, apiEndpoints } from '@/src/shared/constants/api'
import { tokenStorage } from '@/src/shared/storage'

import { RegisterInput, RegistrationEmailResendingInput } from '../model/types/auth'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    logout: builder.mutation<void, void>({
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled
          tokenStorage.removeToken()
        } catch (e) {
          console.warn(e)
        }
      },
      query: () => ({
        method: 'POST',
        url: apiEndpoints.auth.logout,
      }),
    }),
    me: builder.query<MeResponse, void>({
      query: () => ({
        method: 'GET',
        url: apiEndpoints.auth.me,
      }),
    }),
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

export const {
  useLogoutMutation,
  useMeQuery,
  useRegisterUserMutation,
  useRegistrationEmailResendingMutation,
} = authApi
