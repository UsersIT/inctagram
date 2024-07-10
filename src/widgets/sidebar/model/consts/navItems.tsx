import {
  Bookmark,
  BookmarkOutline,
  Home,
  HomeOutline,
  MessageCircle,
  MessageCircleOutline,
  Person,
  PersonOutline,
  PlusSquare,
  PlusSquareOutline,
  SearchIcon,
  TrendingUp,
} from '@/src/shared/assets/icons'
import { routes } from '@/src/shared/constants/routes'

import { NavItem } from '../types/navItem'

export const navItems: Record<string, NavItem> = {
  create: {
    activeIcon: <PlusSquare />,
    icon: <PlusSquareOutline />,
    label: 'create',
    path: routes.CREATE,
  },
  favorites: {
    activeIcon: <Bookmark />,
    icon: <BookmarkOutline />,
    label: 'favorites',
    path: routes.FAVORITES,
  },
  home: {
    activeIcon: <Home />,
    icon: <HomeOutline />,
    label: 'home',
    path: routes.HOME,
  },
  messenger: {
    activeIcon: <MessageCircle />,
    icon: <MessageCircleOutline />,
    label: 'messenger',
    path: routes.MESSENGER,
  },
  profile: {
    activeIcon: <Person />,
    icon: <PersonOutline />,
    label: 'myProfile',
    path: routes.PROFILE,
  },
  search: {
    className: 'gap',
    icon: <SearchIcon height={24} width={24} />,
    label: 'search',
    path: routes.SEARCH,
  },
  statistics: {
    icon: <TrendingUp />,
    label: 'statistics',
    path: routes.STATISTICS,
  },
}

export const sidebarNavItems = [
  navItems.home,
  navItems.create,
  navItems.profile,
  navItems.messenger,
  navItems.search,
  navItems.statistics,
  navItems.favorites,
]
export const bottombarNavItems = [
  navItems.home,
  navItems.create,
  navItems.messenger,
  { ...navItems.search, className: undefined },
  navItems.profile,
]
