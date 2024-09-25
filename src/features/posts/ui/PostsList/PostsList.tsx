import { PostImageCard } from '@/src/entities/post'
import { useGetUserPublicPostsQuery } from '@/src/features/posts/api/postApi'
import { useGetProfileQuery } from '@/src/features/profile/api/profileApi'
import { Spinner } from '@/src/shared/ui'

import s from './PostsList.module.scss'

export const PostsList = () => {
  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery()
  const { data: posts, isFetching } = useGetUserPublicPostsQuery(
    {
      endCursorPostId: 0,
      pageSize: 8,
      sortBy: 'createdAt',
      sortDirection: 'desc',
      userId: profile ? +profile.id : 0,
    },
    { skip: !profile }
  )

  {
    isProfileLoading ? <Spinner style={{ height: '130px', width: '130px' }} /> : ''
  }

  return (
    <div className={s.list}>
      {posts?.items.map((post: { description: any; id: any; images: any[] | string }) => (
        <PostImageCard
          alt={post.description || 'No description available'}
          height={228}
          key={post.id}
          src={
            post.images && post.images.length
              ? post.images[0].url
              : 'https://placehold.co/300x300?text=No+Image'
          }
          width={234}
        />
      ))}
    </div>
  )
}
