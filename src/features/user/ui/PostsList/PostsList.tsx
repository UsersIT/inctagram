import { useGetPostsQuery } from '@/src/entities/user/api/userApi'
import { useGetProfileQuery } from '@/src/features/profile'
import Image from 'next/image'

import s from './PostsList.module.scss'

export const PostsList = () => {
  const { data: profile } = useGetProfileQuery()

  const { data: posts } = useGetPostsQuery(
    { username: profile ? profile.userName : '' },
    { skip: !profile }
  )

  //!! Тут нужно доделать отображение картинок, я пока не могу это сделать полностью так, как на бэке баг с картинками
  //!! Картинки лежат в posts.items.images

  return (
    <div className={s.list}>
      {posts?.items.map(post => (
        <div
          key={post.id}
          style={{ aspectRatio: '1/1', backgroundColor: 'grey', overflow: 'hidden' }}
        >
          {/*<img alt={post.description} src={post.images?.[0].url} />*/}
          {
            <Image
              alt={post.description}
              height={300}
              src={
                post.images && post.images.length
                  ? post.images[0].url
                  : 'https://placehold.co/300x300?text=No+Image'
              }
              width={300}
            />
          }
        </div>
      ))}
    </div>
  )
}
