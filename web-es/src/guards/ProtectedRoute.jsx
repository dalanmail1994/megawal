import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('authToken')
  const { pathname } = useLocation()

  if (!token) {
    return <Navigate to="/login" replace state={{ from: pathname }} />
  }
  return children
}
