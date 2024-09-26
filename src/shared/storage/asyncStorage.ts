import localforage from 'localforage'

export const asyncStorage = {
  getItem: <T>(key: string) => {
    return localforage.getItem<T>(key)
  },

  removeItem: (key: string) => {
    return localforage.removeItem(key)
  },
  setItemSafe: <T>(key: string, value: T) => {
    try {
      return localforage.setItem(key, value)
    } catch (e) {
      return Promise.resolve(null)
    }
  },
}
