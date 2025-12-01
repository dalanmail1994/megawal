// src/components/co/card-swap-depo-with.jsx
import { motion } from 'framer-motion'

export default function CardSwapDepoWith({ mod, setMood }) {
  const interactive = typeof setMood === 'function'

  return (
    <div className="flex flex-col">
      <div
        className={`flex flex-row justify-between [&>div]:flex font-semibold text-[14px] [&>div]:justify-center [&>div]:py-3 [&>div]:w-1/2 ${
          interactive ? '[&>div]:cursor-pointer' : ''
        }`}
      >
        <div
          onClick={interactive ? () => setMood(true) : undefined}
          aria-pressed={!!mod}
          role={interactive ? 'button' : undefined}
        >
          <span className="text-green-600">Deposit</span>
        </div>
        <div
          onClick={interactive ? () => setMood(false) : undefined}
          aria-pressed={!mod}
          role={interactive ? 'button' : undefined}
        >
          <span className="text-red-600">Withdrawal</span>
        </div>
      </div>

      <div className="w-full bg-gray-100">
        <motion.div
          animate={{ x: mod ? '0%' : '100%' }}
          transition={{ type: 'tween', duration: 0.2, ease: 'easeInOut' }}
          className="w-1/2 border-t-2 border-gray-800"
        />
      </div>
    </div>
  )
}
