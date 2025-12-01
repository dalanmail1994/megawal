// src/pages/dashboard/Swap.jsx
import { useEffect, useMemo, useState } from 'react'
import Container from '@/components/co/container'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useInfo } from '@/context/InfoContext'
// import { toast } from 'sonner' // אם תרצה התראות כשנחבר פעולה אמיתית

export default function Swap() {
  const { currencies } = useInfo()

  // הכנת אפשרויות למטבעות (fallback אם אין עדיין data)
  const options = useMemo(
    () =>
      currencies?.length
        ? currencies.map((c) => ({ iso: c.iso, name: c.name }))
        : [
            { iso: 'BTC', name: 'Bitcoin' },
            { iso: 'ETH', name: 'Ethereum' },
          ],
    [currencies]
  )

  // בחירות דיפולט
  const [fromCoin, setFromCoin] = useState(options[0]?.iso || 'BTC')
  const [toCoin, setToCoin] = useState(options[1]?.iso || options[0]?.iso || 'ETH')

  const [amountFrom, setAmountFrom] = useState('0.000000')
  const [amountTo, setAmountTo] = useState('0.000000')

  // שלד ל-rate (כרגע 1:1). בהמשך אפשר למשוך משערים אמיתיים בשרת
  const getRate = () => 1

  // חישוב כמות יעד
  useEffect(() => {
    const rate = getRate()
    const v = parseFloat(amountFrom || '0') * rate
    setAmountTo(Number.isFinite(v) ? v.toFixed(6) : '0.000000')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountFrom, fromCoin, toCoin])

  const switchCoins = () => {
    setFromCoin(toCoin)
    setToCoin(fromCoin)
  }

  // const onSwap = () => {
  //   // דוגמה: toast.success('Swap submitted')
  // }

  const disableSwap = !fromCoin || !toCoin || fromCoin === toCoin || parseFloat(amountFrom) <= 0

  return (
    <div className="flex flex-col space-y-7">
      <h1 className="font-bold text-2xl">Swap Crypto</h1>

      <Container>
        <div className="grid grid-cols-1 gap-6 p-6">
          {/* From */}
          <div className="flex flex-col space-y-2">
            <span className="font-medium">From</span>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3">
              <select
                className="h-[50px] px-3 border rounded-md"
                value={fromCoin}
                onChange={(e) => setFromCoin(e.target.value)}
              >
                {options.map((o) => (
                  <option key={o.iso} value={o.iso}>
                    {o.name} ({o.iso})
                  </option>
                ))}
              </select>

              <Input
                type="text"
                value={amountFrom}
                onChange={(e) => setAmountFrom(e.target.value)}
                className="h-[50px]"
              />
            </div>
          </div>

          {/* פעולה להחלפה */}
          <div className="flex justify-center">
            <Button variant="outline" onClick={switchCoins} className="font-semibold">
              Switch
            </Button>
          </div>

          {/* To */}
          <div className="flex flex-col space-y-2">
            <span className="font-medium">To</span>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3">
              <select
                className="h-[50px] px-3 border rounded-md"
                value={toCoin}
                onChange={(e) => setToCoin(e.target.value)}
              >
                {options.map((o) => (
                  <option key={o.iso} value={o.iso}>
                    {o.name} ({o.iso})
                  </option>
                ))}
              </select>

              <Input type="text" value={amountTo} readOnly className="h-[50px] bg-gray-50" />
            </div>
          </div>

          {/* סיכום קטן */}
          <div className="text-sm text-gray-500">
            Estimated rate: 1 {fromCoin} ≈ {getRate()} {toCoin}
          </div>

          <div className="flex justify-center">
            {/* השארתי כפתור לא פעיל עד חיבור לוגיקה אמיתית */}
            <Button disabled={disableSwap} className="font-bold">
              Preview Swap
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
