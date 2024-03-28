import { en, ru } from '@/src/shared/locales'
import { useRouter } from 'next/router'

export const useTranslation = () => {
  const router = useRouter()

  const t = router.locale === 'en' ? en : ru

  return { t }
}
