import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useUser } from '@/context/UserContext'
import HeaderAdmin from '@/components/co/header-admin'
import MenuAdmin from '@/components/co/menu-admin'

export default function AdminShellLayout() {
  const { user } = useUser()
  const [ok, setOk] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    // Same rule as your Next code: admin if user_type_id < 3
    if (user && user.user_type_id < 3) {
      setOk(true)
    } else {
      setOk(false)
    }
    setChecked(true)
  }, [user])

  if (!checked) {
    return (
      <div className="min-h-dvh flex items-center justify-center text-sm text-gray-500">
        Checking permissions…
      </div>
    )
  }

  if (!ok) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sticky top-0 z-10">
        <HeaderAdmin />
        <MenuAdmin />
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-[1536px] p-[24px] lg:p-[40px]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
