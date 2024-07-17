import { generalInfoFormValues } from '@/src/features/profile/model/schemas/generalInfoValidationSchema'
import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'
import { ApiErrorResult, GetProfileResponse } from '@/src/shared/types/api'

const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => ({
        method: 'GET',
        url: apiEndpoints.user.profile,
      }),
    }),
    updateProfile: builder.mutation<ApiErrorResult, Partial<generalInfoFormValues>>({
      query: body => ({
        body,
        method: 'PUT',
        url: apiEndpoints.user.profile,
      }),
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi
