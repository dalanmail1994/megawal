// src/components/co/menu.jsx
import { Link, useLocation } from 'react-router-dom'
import Ico from './Ico'
import { useUser } from '@/context/UserContext'
import { menuList } from '@/lib/general'

export default function Menu() {
  const { pathname } = useLocation()
  const { user, ticketUnreadCount } = useUser()

  const navs = [
    ...menuList.map(nav => ({
      name: nav.name,
      icon: <Ico path={nav.icon} />,
      link: nav.link,
      space: nav.space,
    })),
    ...(user?.user_type_id < 3 ? [{
      name: 'Admin Panel',
      icon: <Ico path="/flags/ic-admin.svg" />,
      link: '/admin',
    }] : []),
  ]

  return (
    <div className="h-[64px] bg-white/30 backdrop-blur-sm px-[24px] hidden xl:flex flex-row items-center justify-center border-b border-dotted">
      <div className="space-x-3 flex flex-row">
        {navs.map((nav, n) => (
          <Link
            key={n}
            to={nav.link}
            className={`${pathname === nav.link ? 'bg-blue-50 text-blue-600' : 'text-gray-500'} hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors duration-200 ${nav?.space ?? 'space-x-2'} py-1 px-2 rounded-md flex flex-row items-center`}
          >
            {nav.icon}
            <span className="font-semibold text-[15px]">{nav.name}</span>
            {nav.name === 'Support Tickets' && ticketUnreadCount > 0 && (
              <span className="ml-1 bg-red-500 text-white rounded-full px-2 text-[11px] leading-[18px]">
                {ticketUnreadCount}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
