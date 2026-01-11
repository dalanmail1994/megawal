// Keep comments in English per your preference.
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getRequest } from '@/lib/api'
import { toast } from 'sonner'

export const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [ticketUnreadCount, setTicketUnreadCount] = useState(0)
  const lastUnreadCountRef = useRef(null)
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

  useEffect(() => {
    if (!user) return
    let aborted = false

    const fetchUnread = async () => {
      try {
        const params = user.user_type_id < 4 ? { all: true } : {}
        const res = await getRequest('/tickets', params)
        if (aborted || !Array.isArray(res)) return
        const totalUnread = res.reduce((sum, ticket) => sum + (ticket?.unread_count || 0), 0)
        setTicketUnreadCount(totalUnread)
        if (lastUnreadCountRef.current !== null && totalUnread > lastUnreadCountRef.current) {
          if (!location.pathname.includes('/tickets')) {
            toast('New support ticket reply received')
          }
        }
        lastUnreadCountRef.current = totalUnread
      } catch (err) {
        // ignore unread polling errors
      }
    }

    fetchUnread()
    const interval = setInterval(fetchUnread, 12000)
    return () => {
      aborted = true
      clearInterval(interval)
    }
  }, [user, location.pathname])

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
    <UserContext.Provider value={{ user, setUser, ticketUnreadCount }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
