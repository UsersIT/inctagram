import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

import {
  GetFollowersOrFollowingResponse,
  GetFollowersOrFollowingResponseParams,
  GetUserPostsParams,
  GetUserPostsResponse,
} from '../model/types/api'

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getFollowers: builder.query<
      GetFollowersOrFollowingResponse,
      GetFollowersOrFollowingResponseParams
    >({
      query: ({ query, username }) => ({
        method: 'GET',
        url: `${apiEndpoints.followingAndFollowers.userFollowers(username)}?${new URLSearchParams(query as Record<string, string>).toString()}`,
      }),
    }),
    getFollowing: builder.query<
      GetFollowersOrFollowingResponse,
      GetFollowersOrFollowingResponseParams
    >({
      query: ({ query, username }) => ({
        method: 'GET',
        url: `${apiEndpoints.followingAndFollowers.userFollowing(username)}?${new URLSearchParams(query as Record<string, string>).toString()}`,
      }),
    }),
    getPosts: builder.query<GetUserPostsResponse, GetUserPostsParams>({
      query: ({ query, username }) => ({
        method: 'GET',
        url: `${apiEndpoints.posts.postsByUsername(username)}?${new URLSearchParams(query as Record<string, string>).toString()}`,
      }),
    }),
  }),
})

export const { useGetFollowersQuery, useGetFollowingQuery, useGetPostsQuery } = userApi
