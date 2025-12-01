import { Outlet } from 'react-router-dom'
import { UserProvider } from '@/context/UserContext'
import { InfoProvider } from '@/context/InfoContext'

export default function ProvidersLayout() {
  return (
    <UserProvider>
      <InfoProvider>
        <Outlet />
      </InfoProvider>
    </UserProvider>
  )
}
