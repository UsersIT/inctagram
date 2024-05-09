import { storage } from '../storage'

const TOKEN_KEY = 'accessToken'

export const tokenStorage = {
  getToken: () => {
    return storage.getItem(TOKEN_KEY)
  },
  removeToken: () => {
    return storage.removeItem(TOKEN_KEY)
  },
  setToken: (token: string) => {
    return storage.setItem(TOKEN_KEY, token)
  },
}
