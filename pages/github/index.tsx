import { useEffect } from 'react'

import { tokenStorage } from '@/src/shared/storage'
import { useRouter } from 'next/router'
function useQuery() {
  const router = useRouter()
  const hasQueryParams = /\[.+\]/.test(router.route) || /\?./.test(router.asPath)
  const ready = !hasQueryParams || Object.keys(router.query).length > 0

  if (!ready) {
    return null
  }

  return router.query
}
const Github = () => {
  const router = useRouter()
  const query = useQuery()

  useEffect(() => {
    if (!query) {
      return
    }

    tokenStorage.setToken(query.accessToken as string)
    router.push('/')
  }, [query])

  return <></>
}

export default Github
