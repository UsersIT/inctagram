import { tokenStorage } from '@/src/shared/storage'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

export function useGoogleAuth() {
  const router = useRouter()

  return useGoogleLogin({
    flow: 'auth-code',
    onSuccess: googleResponse => {
      const response = googleResponse

      fetch('https://inctagram.work/api/v1/auth/google/login', {
        body: JSON.stringify({
          code: response.code,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Failed to login via Google OAuth')
          }
        })
        .then(data => {
          tokenStorage.setToken(data.accessToken)
          router.push('/')
        })
        .catch(error => {
          console.error('Error:', error)
        })
    },
  })
}
