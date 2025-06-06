export const getStorageItem = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null

  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error('Error reading from localStorage', error)
    return null
  }
}

export const setStorageItem = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error writing to localStorage', error)
  }
}
