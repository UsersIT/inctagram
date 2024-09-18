import {
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetPostsQuery,
} from '@/src/entities/user/api/userApi'
import { ProfileStats } from '@/src/entities/user/ui/ProfileStats/ProfileStats'
import { useGetProfileQuery } from '@/src/features/profile'
import { routes } from '@/src/shared/constants/routes'
import { Avatar, Button, Typography } from '@/src/shared/ui'
import Link from 'next/link'

import s from './ProfileHeader.module.scss'

export const ProfileHeader = () => {
  const { data: profile } = useGetProfileQuery()

  const { data: followers } = useGetFollowersQuery(
    { username: profile ? profile.userName : '' },
    { skip: !profile }
  )
  const { data: following } = useGetFollowingQuery(
    { username: profile ? profile.userName : '' },
    { skip: !profile }
  )
  const { data: posts } = useGetPostsQuery(
    { username: profile ? profile.userName : '' },
    { skip: !profile }
  )

  return (
    <header className={s.header}>
      {profile && <Avatar circle className={s.avatar} url={profile.avatars[0]?.url} />}
      <div className={s.info}>
        <div className={s.infoHeader}>
          <Typography variant={'large'}>{profile?.userName}</Typography>
          <Button as={Link} href={routes.PROFILE_SETTINGS} variant={'secondary'}>
            Profile Settings
          </Button>
        </div>
        <ProfileStats
          followersCount={followers?.totalCount}
          followingCount={following?.totalCount}
          publicationsCount={posts?.totalCount}
        />
        <Typography style={{ textWrap: 'pretty' }} variant={'regular-text-16'}>
          {profile?.aboutMe}
        </Typography>
      </div>
    </header>
  )
}
