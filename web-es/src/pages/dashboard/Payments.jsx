// src/pages/dashboard/Payments.jsx
import { useMemo, useState } from 'react'
import CardSwap from '@/components/co/card-swap'
import ContainerViewAll from '@/components/co/container-view-all'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useInfo } from '@/context/InfoContext'
// import { toast } from 'sonner' // אם תרצה הודעות – בטל הערה והוסף <Toaster /> ב-App

export default function Payments() {
  const { currencies } = useInfo()

  // רשימת מטבעות לתיבה הנפתחת
  const options = useMemo(
    () => (currencies?.length
      ? currencies.map(c => ({ iso: c.iso, name: c.name }))
      : [{ iso: 'BTC', name: 'Bitcoin' }]
    ),
    [currencies]
  )

  const [sellCoin, setSellCoin] = useState(options[0]?.iso || 'BTC')
  const [sellTo, setSellTo] = useState('')
  const [sellAmount, setSellAmount] = useState('0.000000')

  // const onSell = () => {
  //   // דוגמה: toast.success('Sell order placed')
  // }

  return (
    <div className="flex flex-col space-y-7">
      <h1 className="font-bold text-2xl">Buy / Sell</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <CardSwap
            titleA="Buy Crypto"
            titleB="Sell Crypto"
            A={
              <div className="flex flex-col space-y-8 p-10">
                <select className="w-full h-[50px] px-3 border rounded-md" defaultValue={options[0]?.iso}>
                  {options.map((o) => (
                    <option key={o.iso} value={o.iso}>{o.name} Wallet</option>
                  ))}
                </select>

                <div className="flex fle-row justify-center items-center space-x-3 font-medium text-gray-400">
                  <span className="bg-gray-100 rounded-md py-2 px-4">System generating...</span>
                </div>
              </div>
            }
            B={
              <div className="flex flex-col space-y-6 p-10">
                <select
                  className="w-full h-[50px] px-3 border rounded-md"
                  value={sellCoin}
                  onChange={(e) => setSellCoin(e.target.value)}
                >
                  {options.map((o) => (
                    <option key={o.iso} value={o.iso}>{o.name} Wallet</option>
                  ))}
                </select>

                <div className="flex flex-col space-y-1">
                  <span className="font-medium">Send to</span>
                  <Input
                    type="text"
                    placeholder="..."
                    value={sellTo}
                    onChange={(e) => setSellTo(e.target.value)}
                    className="h-[46px]"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="font-medium">Amount</span>
                  <Input
                    type="text"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                  />
                </div>

                <div className="flex justify-center">
                  {/* שמרתי Disabled כמו במקור; אם תרצה — בטל ותחבר לפעולה */}
                  <Button disabled>
                    Send {options.find(o => o.iso === sellCoin)?.name || 'Bitcoin'}
                  </Button>
                </div>
              </div>
            }
          />
        </div>

        <ContainerViewAll
          title="Recent Payments"
          subTitle="View your recent payments"
          viewAll={false}
        >
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center space-y-4">
              <img src="/flags/ic-content.svg" className="w-[160px]" />
              <h2 className="font-semibold text-lg text-gray-400">No payments yet</h2>
              <span className="text-xs text-gray-400">All caught up!</span>
            </div>
          </div>
        </ContainerViewAll>
      </div>
    </div>
  )
}
