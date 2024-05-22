import { MeResponse } from '@/src/features/auth/model/types/auth'
import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'
import { tokenStorage } from '@/src/shared/storage'

const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    logout: build.mutation<void, void>({
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
    me: build.query<MeResponse, void>({
      query: () => ({
        method: 'GET',
        url: apiEndpoints.auth.me,
      }),
    }),
  }),
})

export const { useLogoutMutation, useMeQuery } = authApi
