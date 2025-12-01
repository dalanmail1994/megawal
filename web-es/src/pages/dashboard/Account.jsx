// src/pages/dashboard/Account.jsx
import { useState } from 'react'
import Ico from '@/components/co/Ico'
import MenuAccount from '@/components/co/menu-account'
import GeneralAcc from '@/components/acc/general'
import PreferencesAcc from '@/components/acc/preferences'
import SecurityAcc from '@/components/acc/security'
import VerificationAcc from '@/components/acc/verification'
import PaymentsAcc from '@/components/acc/payments'
import { useUser } from '@/context/UserContext'
import { putRequest } from '@/lib/api'
import { toast } from 'sonner'

export default function Account() {
  const { user, setUser } = useUser()
  const [index, setIndex] = useState(0)

  /**
   * עדכון משתמש בשרת + סנכרון סטייט מקומי
   * @param {Object} obj     גוף הבקשה
   * @param {Function} stopLoading פונקציה setLoading מהקומפוננטה הקוראת
   * @param {Array} names     רשימת שדות לעדכן לוקאלית מתוך res.user
   * @param {String} path     נתיב חלופי לבקשה (ברירת מחדל: /users/:id)
   */
  const updateUser = async (obj, stopLoading = () => {}, names = [], path) => {
    try {
      const res = await putRequest(`${path || `/users/${user?.id}`}`, obj)

      if (Array.isArray(names) && names.length > 0 && res?.user) {
        const partial = {}
        for (const name of names) {
          partial[name] = res.user[name]
        }
        setUser((prev) => ({ ...prev, ...partial }))
      }

      toast.success(res?.message || 'Updated successfully')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Update failed')
    } finally {
      stopLoading(false)
    }
  }

  const navs = [
    {
      name: 'General',
      icon: <Ico path="/flags/ic-analytics.svg" />,
      content: <GeneralAcc updateUser={updateUser} />,
    },
    {
      name: 'Preferences',
      icon: <Ico path="/flags/ic-banking.svg" />,
      content: <PreferencesAcc updateUser={updateUser} />,
    },
    {
      name: 'Payment Methods',
      icon: <Ico path="/flags/ic-payment.svg" />,
      content: <PaymentsAcc updateUser={updateUser} />,
    },
    {
      name: 'Verification',
      icon: <Ico path="/flags/ic-veri.svg" />,
      content: <VerificationAcc />,
    },
    {
      name: 'Security',
      icon: <Ico path="/flags/ic-support.svg" />,
      content: <SecurityAcc updateUser={updateUser} />,
    },
  ]

  return (
    <div className="flex flex-col space-y-7">
      <h1 className="font-bold text-2xl">Account Settings</h1>

      <div className="flex flex-col space-y-2">
        <MenuAccount index={index} setIndex={setIndex} navs={navs} />
        <div>{navs[index]?.content}</div>
      </div>
    </div>
  )
}
