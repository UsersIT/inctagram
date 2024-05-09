export const storage = {
  getItem: (key: string) => {
    return window.localStorage.getItem(key)
  },
  removeItem: (key: string) => {
    return window.localStorage.removeItem(key)
  },
  setItem: (key: string, value: string) => {
    return window.localStorage.setItem(key, value)
  },
}
