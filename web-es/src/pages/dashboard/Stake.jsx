// src/pages/dashboard/Stake.jsx
import { useState } from 'react'
import Container from '@/components/co/container'
import Ico from '@/components/co/Ico'
import { Button } from '@/components/ui/button'

export default function Stake() {
  const stakePlans = [
    { key: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: '/coins/btc.svg', rate: '2.7%', min: '0.005', max: '1.0' },
    { key: 'eth', name: 'Ethereum', symbol: 'ETH', icon: '/coins/eth.svg', rate: '3.1%', min: '0.10', max: '25' },
    { key: 'usdt', name: 'Tether', symbol: 'USDT', icon: '/coins/usdt.svg', rate: '4.2%', min: '100', max: '10000' },
    { key: 'bnb', name: 'BNB', symbol: 'BNB', icon: '/coins/bnb.svg', rate: '3.4%', min: '0.50', max: '50' },
    { key: 'sol', name: 'Solana', symbol: 'SOL', icon: '/coins/solana.svg', rate: '4.0%', min: '5', max: '200' },
    { key: 'xrp', name: 'Ripple', symbol: 'XRP', icon: '/coins/xrp.svg', rate: '3.0%', min: '200', max: '50000' },
    { key: 'ada', name: 'Cardano', symbol: 'ADA', icon: '/coins/ada.svg', rate: '3.3%', min: '300', max: '80000' },
    { key: 'doge', name: 'Dogecoin', symbol: 'DOGE', icon: '/coins/doge.svg', rate: '3.6%', min: '1000', max: '200000' },
  ]

  return (
    <div className="flex flex-col space-y-7">
      <h1 className="font-bold text-2xl">Stake Plans</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
        {stakePlans.map((plan) => (
          <StakeCard key={plan.key} plan={plan} />
        ))}
      </div>
    </div>
  )
}

function StakeCard({ plan }) {
  const [selected, setSelected] = useState(0) // 0=7d, 1=14d, 2=30d

  return (
    <Container>
      <div className="flex flex-col items-center space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4">
          <Ico path={plan.icon} width="45px" height="45px" />
          <h2 className="font-semibold text-xl text-gray-800">{plan.name} Stake</h2>
        </div>

        {/* Durations */}
        <div className="flex text-gray-800 flex-wrap justify-center gap-4 text-[14px] font-medium w-full max-w-md mx-auto [&>button]:cursor-pointer">
          <button
            onClick={() => setSelected(0)}
            className={`flex-1 min-w-[40%] max-w-[45%] px-4 py-3.5 border ${
              selected === 0 ? 'border-blue-500' : 'border-gray-500'
            } rounded-lg`}
          >
            7 Days
          </button>
          <button
            onClick={() => setSelected(1)}
            className={`flex-1 min-w-[40%] max-w-[45%] px-4 py-3.5 border ${
              selected === 1 ? 'border-blue-500' : 'border-gray-500'
            } rounded-lg`}
          >
            14 Days
          </button>
          <button
            onClick={() => setSelected(2)}
            className={`w-1/2 px-4 py-3.5 border rounded-lg ${
              selected === 2 ? 'border-blue-500' : 'border-gray-500'
            }`}
          >
            30 Days
          </button>
        </div>

        {/* Details */}
        <div className="flex flex-col w-full text-[13px] text-gray-500">
          <SmLine A="Rate" B={plan.rate} />
          <SmLine A="Min Value" B={`${plan.min} ${plan.symbol}`} />
          <SmLine A="Max Value" B={`${plan.max} ${plan.symbol}`} />
        </div>

        {/* Action */}
        <Button className="w-full py-4 cursor-pointer">
          <span className="font-semibold text-[17px]">Stake</span>
        </Button>
      </div>
    </Container>
  )
}

function SmLine({ A, B }) {
  return (
    <div className="flex flex-row justify-between">
      <span className="font-semibold">{A}</span>
      <span className="text-gray-600">{B}</span>
    </div>
  )
}
