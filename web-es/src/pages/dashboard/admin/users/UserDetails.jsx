// src/pages/dashboard/admin/users/UserDetails.jsx
import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getRequest } from '@/lib/api'

// ניווט טאבּים של עמוד המשתמש
import MenuUser from '@/components/co/menu-user'

// תתי־עמודים
import ProfilePage from '@/components/user-page/profile'
import WalletPage from '@/components/user-page/wallet'
import TransactionsPage from '@/components/user-page/transactions'
import TicketPage from '@/components/user-page/ticket'
import KycPage from '@/components/user-page/kyc'
import PaymentPage from '@/components/user-page/payment'
// import StakePage from '@/components/user-page/stake'
import LogsPage from '@/components/user-page/logs'

export default function AdminUserDetails() {
  const { id } = useParams()
  const [user, setUser] = useState()
  const [index, setIndex] = useState(0)

  const pages = useMemo(
    () => [
      <ProfilePage key="profile" user={user} setUser={setUser} />,
      <WalletPage key="wallet" userId={id} user={user} />,
      <TransactionsPage key="tx" userId={id} />,
      <TicketPage key="tickets" userId={id} />,
      <KycPage key="kyc" userId={id} />,
      <PaymentPage key="payment" userId={id} />,
      // <StakePage key="stake" />,
      <LogsPage key="logs" userId={id} />,
    ],
    [id, user]
  )

  const getUser = async () => {
    if (!id) return
    try {
      const res = await getRequest(`/users/${id}`)
      setUser(res)
    } catch (err) {
      // אפשר להוסיף toast במקרה של שגיאה
      // toast.error(err?.response?.data?.message || 'Failed to load user')
    }
  }

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className="flex flex-col space-y-4">
      {/* כותרת פרופיל */}
      <div className="flex flex-col space-y-1">
        <div className="flex flex-row bg-[#344a8c] rounded-lg p-8 space-x-6 items-center">
          <div className="w-[80px] h-[80px] border-2 border-white bg-[#4b5e94] rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-semibold">
              {user?.first_name?.slice(0, 1)?.toUpperCase() || '?'}
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-2xl text-white font-extrabold">
              {user?.first_name} {user?.last_name}
            </h2>
            <span className="text-gray-300 font-medium">{user?.email}</span>
          </div>
        </div>

        {/* תפריט טאבים */}
        <MenuUser index={index} setIndex={setIndex} avalible={!!user} />
      </div>

      {/* תוכן טאב נבחר */}
      <div>{pages[index]}</div>
    </div>
  )
}
