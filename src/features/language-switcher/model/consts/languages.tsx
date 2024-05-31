import { RussiaFlag, UnitedKingdomFlag } from '@/src/shared/assets/icons'
import { type Option } from '@/src/shared/ui'

export const languages: Option[] = [
  {
    disabled: false,
    icon: <UnitedKingdomFlag />,
    label: 'English',
    value: 'en',
  },
  {
    disabled: false,
    icon: <RussiaFlag />,
    label: 'Русский',
    value: 'ru',
  },
]
