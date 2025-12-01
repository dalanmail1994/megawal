// src/components/co/menu-user.jsx
import Ico from './Ico'

export default function MenuUser({ index, setIndex, avalible }) {
  const navs = [
    { name: 'Profile',            icon: <Ico path="/flags/ic-analytics.svg" /> },
    { name: 'Wallets',            icon: <Ico path="/flags/ic-banking.svg" /> },
    { name: 'Transactions',       icon: <Ico path="/flags/ic-money.svg" /> },
    { name: 'Support Tickets',    icon: <Ico path="/flags/ic-swap.svg" /> },
    { name: 'KYC Verifications',  icon: <Ico path="/flags/ic-support.svg" /> },
    { name: 'Payments Methods',   icon: <Ico path="/flags/ic-support.svg" /> },
    // { name: 'Stakes',          icon: <Ico path="/flags/ic-support.svg" /> },
    { name: 'Logs',               icon: <Ico path="/flags/ic-logs.svg" /> },
  ]

  const base =
    'text-gray-600 border-b-[2.5px] hover:text-gray-700 py-1 px-2 space-x-2 flex flex-row items-center transition-colors duration-200'
  const active = 'border-gray-600'
  const inactive = 'border-white'
  const disabled = 'opacity-60 cursor-not-allowed'
  const enabled = 'cursor-pointer'

  return (
    <div className="h-[64px] flex flex-row items-center justify-center">
      <div className="space-x-4 flex flex-row">
        {navs.map((nav, n) => (
          <button
            key={n}
            type="button"
            title={nav.name}
            onClick={avalible ? () => setIndex(n) : undefined}
            disabled={!avalible}
            className={[
              base,
              index === n ? active : inactive,
              avalible ? enabled : disabled,
            ].join(' ')}
          >
            {nav.icon}
            <span className="font-semibold text-[15px]">{nav.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
