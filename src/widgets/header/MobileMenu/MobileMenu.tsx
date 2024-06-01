import { LogoutButton } from '@/src/features/auth'
import { Bookmark, More, Settings, Trending_up } from '@/src/shared/assets/icons'
import { RouteNames } from '@/src/shared/constants/routNames'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Typography } from '@/src/shared/ui'
import { Dropdown } from '@/src/shared/ui/Dropdown'
import Link from 'next/link'

import s from './MobileMenu.module.scss'

interface Props {
  disabled?: boolean
  isAuth?: boolean
  onLogout?: () => void
  ownerId?: number
}

export const MobileMenu = ({ disabled, isAuth, onLogout, ownerId }: Props) => {
  const { t } = useTranslation()

  const authItems = (
    <>
      {ownerId && (
        <Dropdown.Item className={s.item}>
          <Typography
            as={Link}
            className={s.option}
            href={{
              pathname: RouteNames.PROFILE + `/${ownerId}/${RouteNames.PROFILE_SETTINGS}`,
              query: { tab: 'general' },
            }}
            variant={'regular-text-14'}
          >
            <Settings />
            {t.buttons.profileSettings}
          </Typography>
        </Dropdown.Item>
      )}
      <Dropdown.Item className={s.item}>
        <Typography
          as={Link}
          className={s.option}
          href={RouteNames.STATISTICS}
          variant={'regular-text-14'}
        >
          <Trending_up />
          {t.buttons.statistics}
        </Typography>
      </Dropdown.Item>
      <Dropdown.Item className={s.item}>
        <Typography
          as={Link}
          className={s.option}
          href={RouteNames.FAVORITES}
          variant={'regular-text-14'}
        >
          <Bookmark />
          {t.buttons.favorites}
        </Typography>
      </Dropdown.Item>
      <LogoutButton />
    </>
  )

  const noAuthItems = (
    <>
      <Dropdown.Item className={s.item}>
        <Typography
          as={Link}
          className={s.link}
          href={RouteNames.SIGN_IN}
          variant={'regular-text-14'}
        >
          {t.buttons.signIn}
        </Typography>
      </Dropdown.Item>
      <Dropdown.Item className={s.item}>
        <Typography
          as={Link}
          className={s.link}
          href={RouteNames.SIGN_UP}
          variant={'regular-text-14'}
        >
          {t.buttons.signUp}
        </Typography>
      </Dropdown.Item>
    </>
  )

  return (
    <Dropdown.Menu
      align={'end'}
      className={s.menu}
      modal={false}
      sideOffset={6}
      trigger={
        <Button className={s.root} variant={'text'}>
          <More />
        </Button>
      }
    >
      {isAuth ? authItems : noAuthItems}
    </Dropdown.Menu>
  )
}
