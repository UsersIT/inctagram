import { Typography } from '@/src/shared/ui'

import s from './ProfileStats.module.scss'

type Props = {
  followersCount?: number
  followingCount?: number
  publicationsCount?: number
}

export const ProfileStats = ({ followersCount, followingCount, publicationsCount }: Props) => {
  return (
    <div className={s.stats}>
      <div>
        <Typography variant={'bold-text-14'}>{followingCount}</Typography>
        <Typography variant={'regular-text-14'}>Following</Typography>
      </div>
      <div>
        <Typography variant={'bold-text-14'}>{followersCount}</Typography>
        <Typography variant={'regular-text-14'}>Following</Typography>
      </div>
      <div>
        <Typography variant={'bold-text-14'}>{publicationsCount}</Typography>
        <Typography variant={'regular-text-14'}>Publications</Typography>
      </div>
    </div>
  )
}
