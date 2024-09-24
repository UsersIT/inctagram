import { baseApi } from '@/src/shared/api/baseApi'
import { apiEndpoints } from '@/src/shared/constants/api'

import {
  GetFollowersOrFollowingResponse,
  GetFollowersOrFollowingResponseParams,
  GetPublicPostsResponse,
  GetPublicUserProfileByIdResponse,
  GetUserPostsParams,
  GetUserPostsResponse,
  GetUserPublicPostsArgs,
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
    getPublicUserProfileById: builder.query<
      GetPublicUserProfileByIdResponse,
      { profileId: number }
    >({
      providesTags: [],
      query: ({ profileId }) => ({
        method: 'GET',
        url: `${apiEndpoints.public.user.userProfileById}${profileId}`,
      }),
    }),
    getUserPublicPosts: builder.query<GetPublicPostsResponse, GetUserPublicPostsArgs>({
      providesTags: [],
      query: args => ({
        method: 'GET',
        params: {
          pageSize: args.pageSize,
          sortBy: args.sortBy,
          sortDirection: args.sortDirection,
        },
        url: `${apiEndpoints.public.posts.allByUserIdWithPagination}${args.userId}/${args.endCursorPostId}`,
      }),
    }),
  }),
})

export const {
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetPostsQuery,
  useGetPublicUserProfileByIdQuery,
  useGetUserPublicPostsQuery,
} = userApi
