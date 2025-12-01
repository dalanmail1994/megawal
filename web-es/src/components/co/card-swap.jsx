// src/components/co/card-swap.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import Container from './container'

export default function CardSwap({ titleA, titleB, A, B, defaultMood = false }) {
  // false = A (Receive), true = B (Send)
  const [mood, setMood] = useState(defaultMood)

  return (
    <Container p="p-0">
      <div className="flex flex-col">
        {/* כותרות הטאבים */}
        <div className="flex flex-row justify-between bg-gray-100 [&>div]:flex [&>div]:cursor-pointer font-semibold text-[16px] [&>div]:justify-center [&>div]:py-4 [&>div]:w-1/2">
          <div onClick={() => setMood(false)}>
            <span>{titleA}</span>
          </div>
          <div onClick={() => setMood(true)}>
            <span>{titleB}</span>
          </div>
        </div>

        {/* קו תחתון זז */}
        <div className="w-full bg-gray-100">
          <motion.div
            animate={{ x: mood ? '100%' : '0%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-1/2 border-t-2 border-gray-800"
          />
        </div>

        {/* תוכן */}
        {mood ? B : A}
      </div>
    </Container>
  )
}
