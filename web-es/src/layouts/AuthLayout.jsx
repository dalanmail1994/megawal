// src/layouts/AuthLayout.jsx
import { Outlet, Navigate, useLocation } from 'react-router-dom'

export default function AuthLayout() {
  // אם המשתמש כבר מחובר – לאפשר חזרה ליעד שממנו הגיע (state.from) או לדף הבית
  const location = useLocation()
  const from = location.state?.from
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null

  if (token) {
    const to =
      from && !['/login', '/sign-up'].includes(from)
        ? from
        : '/'
    return <Navigate to={to} replace />
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.webp')" }}
    >
      <div className="absolute inset-0 bg-white/50 z-10" />
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <Outlet />
      </div>
    </div>
  )
}
