import type { AddAvatarResponse, GetProfileResponse } from '../model/types/api'

import { generalInfoFormValues } from '@/src/features/profile/model/schemas/generalInfoValidationSchema'
import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'
import { ApiErrorResult } from '@/src/shared/types/api'

const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteAvatar: builder.mutation<void, void>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          profileApi.util.updateQueryData('getProfile', undefined, draft => {
            if (draft) {
              draft.avatars = []
            }
          })
        )

        try {
          await queryFulfilled
        } catch (err) {
          patchResult.undo()
        }
      },
      query: () => ({
        method: 'DELETE',
        url: apiEndpoints.profile.avatar,
      }),
    }),
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => ({
        method: 'GET',
        url: apiEndpoints.profile.profile,
      }),
    }),
    updateProfile: builder.mutation<ApiErrorResult, Partial<generalInfoFormValues>>({
      query: body => ({
        body,
        method: 'PUT',
        url: apiEndpoints.public.user.profile,
      }),
    }),
    uploadAvatar: builder.mutation<AddAvatarResponse, FormData>({
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        let avatarURL: string | undefined
        let result

        try {
          const { data } = await queryFulfilled

          result = dispatch(
            profileApi.util.updateQueryData('getProfile', undefined, draft => {
              if (data.avatar) {
                draft.avatars = [data.avatar] // обновляем аватар в профиле
              }
            })
          )
        } catch (err) {
          result && result.undo()
        } finally {
          avatarURL && URL.revokeObjectURL(avatarURL)
        }
      },
      query: FormData => ({
        body: FormData,
        method: 'POST',
        url: apiEndpoints.profile.avatar,
      }),
    }),
  }),
})

export const {
  useDeleteAvatarMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} = profileApi
