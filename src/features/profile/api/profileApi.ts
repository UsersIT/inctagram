import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'
import { AddAvatarResponse, GetProfileResponse } from '@/src/shared/types/api'

export const profileApi = baseApi.injectEndpoints({
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
        url: apiEndpoints.user.deleteAvatar,
      }),
    }),
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => ({
        method: 'GET',
        url: apiEndpoints.user.profile,
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
          console.error('Ошибка загрузки:', err)
          result && result.undo()
        } finally {
          avatarURL && URL.revokeObjectURL(avatarURL)
        }
      },
      query: FormData => ({
        body: FormData,
        method: 'POST',
        url: apiEndpoints.user.uploadAvatar,
      }),
    }),
  }),
})

export const { useDeleteAvatarMutation, useGetProfileQuery, useUploadAvatarMutation } = profileApi
