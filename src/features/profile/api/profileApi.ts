import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'
import { AddAvatarResponse } from '@/src/shared/types/api'

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteAvatar: builder.mutation<void, void>({
      query: () => ({
        method: 'DELETE',
        url: apiEndpoints.profile.deleteAvatar,
      }),
    }),
    uploadAvatar: builder.mutation<AddAvatarResponse, FormData>({
      query: FormData => ({
        body: FormData,
        method: 'POST',
        url: apiEndpoints.profile.uploadAvatar,
      }),
    }),
  }),
})

export const { useDeleteAvatarMutation, useUploadAvatarMutation } = profileApi
