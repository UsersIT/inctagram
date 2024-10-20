import { ProfileHeader } from '@/src/entities/profile'
import { useMeQuery } from '@/src/features/auth'
import { routes } from '@/src/shared/constants/routes'
import { useTranslation } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui'
import clsx from 'clsx'
import Link from 'next/link'

import s from './ProfileInfo.module.scss'

import {
  useFollowingUserMutation,
  useGetPublicUserProfileByIdQuery,
  useGetUserQuery,
} from '../../api/profileApi'

type Props = {
  className?: string
  profileId: number
}

export const ProfileInfo = ({ className, profileId }: Props) => {
  const { data: profileData } = useGetPublicUserProfileByIdQuery({ profileId })
  const { data: userData, isSuccess } = useGetUserQuery(
    { userName: profileData?.userName },
    { skip: !profileData?.userName }
  )
  const [followUser, { isLoading: isLoadingFollow }] = useFollowingUserMutation()
  const { data: me } = useMeQuery(undefined)

  const { t } = useTranslation()

  if (!profileData) {
    return null
  }
  const isMyProfile = me ? me.userId === +profileId : false

  const followingUserHandler = () => {
    followUser({ selectedUserId: profileId })
  }

  return (
    <header className={clsx(s.content, className)}>
      <ProfileHeader
        avatarUrl={profileData?.avatars[0]?.url ? profileData?.avatars[0]?.url : ''}
        description={profileData?.aboutMe}
        followersCount={userData?.followersCount}
        followingCount={userData?.followingCount}
        publicationsCount={userData?.publicationsCount}
        userName={profileData?.userName}
      >
        {isSuccess && !isMyProfile && (
          <Button
            disabled={isLoadingFollow}
            onClick={followingUserHandler}
            variant={userData?.isFollowing ? 'outlined' : 'primary'}
          >
            {userData?.isFollowing ? `${t.buttons.unfollow}` : `${t.buttons.follow}`}
          </Button>
        )}
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
      </ProfileHeader>
    </header>
  )
}
