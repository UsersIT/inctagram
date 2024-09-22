import {
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetPostsQuery,
} from '@/src/entities/user/api/userApi'
import { ProfileStats } from '@/src/entities/user/ui/ProfileStats/ProfileStats'
import { useMeQuery } from '@/src/features/auth'
import { useGetProfileQuery } from '@/src/features/profile'
import { routes } from '@/src/shared/constants/routes'
import { useTranslation } from '@/src/shared/hooks'
import { Avatar, Button, Typography } from '@/src/shared/ui'
import clsx from 'clsx'
import Link from 'next/link'

import s from './ProfileHeader.module.scss'

type Props = {
  className?: string
}

export const ProfileHeader = ({ className }: Props) => {
  const { data: profile } = useGetProfileQuery()
  const { data: me, isError } = useMeQuery(undefined)
  const { data: followers } = useGetFollowersQuery(
    { username: profile?.userName || '' },
    { skip: !profile }
  )
  const { data: following } = useGetFollowingQuery(
    { username: profile?.userName || '' },
    { skip: !profile }
  )
  const { data: posts } = useGetPostsQuery(
    { username: profile?.userName || '' },
    { skip: !profile }
  )
  const { t } = useTranslation()

  if (!profile) {
    return null
  }

  const isMyProfile = me?.userId === profile.id

  return (
    <header className={clsx(s.header, className)}>
      {profile.avatars[0]?.url && (
        <Avatar circle className={s.avatar} url={profile.avatars[0].url} />
      )}
      <Typography as={'h2'} className={s.name} variant={'large'}>
        {profile.userName.length > 15 ? profile.userName.slice(0, 15) + '...' : profile.userName}
      </Typography>
      {isMyProfile && (
        <Button
          as={Link}
          className={s.settings}
          href={routes.PROFILE_SETTINGS}
          variant={'secondary'}
        >
          {t.buttons.profileSettings}
        </Button>
      )}
      <ProfileStats
        className={s.stats}
        followersCount={followers?.totalCount}
        followingCount={following?.totalCount}
        publicationsCount={posts?.totalCount}
      />
      <Typography className={s.aboutMe} style={{ textWrap: 'pretty' }} variant={'regular-text-16'}>
        {profile.aboutMe}
      </Typography>
    </header>
  )
}
