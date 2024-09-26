import type { PostDescription, UploadPostImagesResponse } from '../model/types/api'
import type { Post } from '@/src/entities/post'

import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

export const createPostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    uploadPost: builder.mutation<Post, PostDescription>({
      //invalidatesTags: ['UserPosts'],
      query: body => ({
        body,
        method: 'POST',
        url: apiEndpoints.posts.posts,
      }),
    }),
    uploadPostImages: builder.mutation<UploadPostImagesResponse, FormData>({
      query: body => ({
        body,
        method: 'POST',
        url: apiEndpoints.posts.image,
      }),
    }),
  }),
})

export const { useUploadPostImagesMutation, useUploadPostMutation } = createPostApi
