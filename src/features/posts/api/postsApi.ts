import { updatePostTextRequest } from '@/src/features/posts/model/types/api'
import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    uploadPost: builder.mutation<void, updatePostTextRequest>({
      query: ({ payload, postId }) => ({
        body: payload,
        method: 'PUT',
        url: `${apiEndpoints.posts.updatePost}/${postId}`,
      }),
    }),
  }),
})

export const { useUploadPostMutation } = postsApi
