// src/pages/dashboard/admin/Index.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminHome() {
  const navigate = useNavigate()

  useEffect(() => {
    // החלפה כדי שלא יישאר היסטוריה ל־/admin
    navigate('/admin/users', { replace: true })
  }, [navigate])

  return null
}
