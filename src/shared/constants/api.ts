/*export const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN*/

export const BASE_URL = 'https://inctagram.work'
export const URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://picthentic.online'

export const apiEndpoints = {
  auth: {
    checkRecoveryCode: '/api/v1/auth/check-recovery-code',
    github: '/api/v1/auth/github/login',
    google: '/api/v1/auth/google/login',
    login: '/api/v1/auth/login',
    logout: '/api/v1/auth/logout',
    me: '/api/v1/auth/me',
    newPassword: '/api/v1/new-password',
    passwordRecovery: '/api/v1/password-recovery',
    registration: '/api/v1/auth/registration',
    registrationConfirmation: '/api/v1/auth/registration-confirmation',
    registrationEmailResending: '/api/v1/auth/registration-email-resending',
    updateTokens: '/api/v1/auth/update-tokens',
  },
  public: {
    posts: {
      allByUserIdWithPagination: '/api/v1/public-posts/user/', // + `${userId}/${endCursorpostId}`
      allWithPagination: '/api/v1/public-posts/all/', // + `${endCursorpostId}`
      postById: '/api/v1/public-posts/', // + `${postId}`
    },
    user: {
      userProfileById: '/api/v1/public-user/profile/', // + `${profileId}`
      usersCount: '/api/v1/public-user',
    },
  },
} as const
