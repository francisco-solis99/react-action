import { useState } from "react"

export default function useLocalStorage({ key, initialValue }: { key: string, initialValue: unknown }) {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    return window.localStorage.getItem(key) ?? initialValue
  })

  const updateValue = (newValue: unknown) => {
    window.localStorage.setItem(key, JSON.stringify(newValue))
    setLocalStorageValue(newValue)
  }

  return {
    localStorageValue,
    updateValue
  }
}
