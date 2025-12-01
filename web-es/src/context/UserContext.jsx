// Keep comments in English per your preference.
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getRequest } from '@/lib/api'

export const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let aborted = false

    const handleAuth = async () => {
      const token = localStorage.getItem('authToken')
      if (!token) {
        // No token -> go to login, keep where we came from
        navigate('/login', { replace: true, state: { from: location.pathname } })
        return
      }

      try {
        const res = await getRequest('/user')
        if (!aborted) setUser(res)
      } catch (err) {
        if (!aborted) {
          localStorage.removeItem('authToken')
          navigate('/login', { replace: true })
        }
      } finally {
        if (!aborted) setLoading(false)
      }
    }

    handleAuth()
    return () => { aborted = true }
  }, [navigate, location.pathname])

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center text-sm text-gray-500">
        Verifying session…
      </div>
    )
  }

  // if user is null but not loading, ProtectedRoute will handle redirect anyway
  if (!user) return null

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
