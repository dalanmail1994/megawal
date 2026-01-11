// src/components/co/menu-admin.jsx
import { NavLink, useLocation } from 'react-router-dom'
import Ico from './Ico'
import { menuListAdmin } from '@/lib/general'
import { useUser } from '@/context/UserContext'

export default function MenuAdmin() {
  const { pathname } = useLocation()
  const { ticketUnreadCount } = useUser()

  const navClass = (active) =>
    `${active ? 'bg-blue-50 text-blue-600' : 'text-gray-500'} hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors duration-200 py-1 px-2 rounded-md flex flex-row items-center`

  return (
    <div className="h-[64px] bg-white/30 backdrop-blur-sm px-[24px] hidden xl:flex flex-row items-center justify-center border-b border-dotted">
      <div className="space-x-3 flex flex-row">
        {menuListAdmin.map((nav, n) => {
          const isActive = pathname === nav.link || pathname.startsWith(`${nav.link}/`)
          return (
            <NavLink
              key={n}
              to={nav.link}
              className={({ isActive: rrActive }) =>
                `${navClass(rrActive || isActive)} ${nav?.space ?? 'space-x-2'}`
              }
              end={nav.link === '/admin'}
            >
              <Ico path={nav.icon} />
              <span className="font-semibold text-[15px] ml-2">{nav.name}</span>
              {nav.name === 'Support Tickets' && ticketUnreadCount > 0 && (
                <span className="ml-1 bg-red-500 text-white rounded-full px-2 text-[11px] leading-[18px]">
                  {ticketUnreadCount}
                </span>
              )}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
