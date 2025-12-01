// Keep comments in English per your preference.
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { getRequest } from '@/lib/api'

export const InfoContext = createContext(null)

export function InfoProvider({ children }) {
  const [currencies, setCurrencies] = useState(null)
  const [loading, setLoading] = useState(true)

  const getCurrencies = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getRequest('/currencies')
      setCurrencies(res || [])
    } catch (_) {
      setCurrencies([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getCurrencies()
  }, [getCurrencies])

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center text-sm text-gray-500">
        Loading app data…
      </div>
    )
  }

  return (
    <InfoContext.Provider value={{ currencies, getCurrencies }}>
      {children}
    </InfoContext.Provider>
  )
}

export const useInfo = () => useContext(InfoContext)
