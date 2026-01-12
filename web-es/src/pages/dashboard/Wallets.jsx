// src/pages/dashboard/Wallets.jsx
import { useEffect, useRef, useState } from 'react'
import Container from '@/components/co/container'
import { Input } from '@/components/ui/input'
import { Clipboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CardSwap from '@/components/co/card-swap'
import Ico from '@/components/co/Ico'
import { toast } from 'sonner'
import { QRCodeSVG } from 'qrcode.react'
import { formDataToObject } from '@/lib/utils'
import { postRequest } from '@/lib/api'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import TransactionsCard from '@/components/co/transactions-card'
import YourAssets from '@/components/co/your-assets'
import { useInfo } from '@/context/InfoContext'
import { useUser } from '@/context/UserContext'

export default function Wallets() {
  const defZero = '0.000000'
  const { user } = useUser()
  const { currencies } = useInfo()

  const [selectedCoin, setSelectedCoin] = useState('BTC')
  const [amountSend, setAmountSend] = useState(defZero)
  const [open, setOpen] = useState(null)

  const ref = useRef()

  useEffect(() => {
    setAmountSend(defZero)
  }, [selectedCoin])

  const copyFunc = () => {
    const pub = currencies?.find(c => c.iso === selectedCoin)?.wallet?.public_key || ''
    navigator.clipboard.writeText(pub)
      .then(() => toast.success('Copied!'))
      .catch(err => console.error('Failed to copy: ', err))
  }

  const maxAmountFunc = () => {
    const max = user?.balances?.[selectedCoin]?.amount
    setAmountSend(max || defZero)
  }

  const sendCrypto = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const obj = formDataToObject(formData)
    const requestedAmount = Number(obj?.amount)
    const availableAmount = Number(user?.balances?.[selectedCoin]?.amount ?? 0)

    if (!Number.isFinite(requestedAmount) || requestedAmount <= 0) {
      toast.error('Enter a valid amount')
      return
    }

    if (requestedAmount > availableAmount) {
      toast.error(`Insufficient balance. Available: ${availableAmount} ${selectedCoin}`)
      return
    }

    const newObj = {
      ...obj,
      mod: false,
      date: new Date().toISOString().slice(0, 16),
      status: 'pending',
      user_id: user.id,
      currency_iso: selectedCoin,
      transaction_hash: '****************',
      from_public_address: currencies?.find(c => c.iso === selectedCoin)?.wallet?.public_key || '',
      descreption: 'Transaction is Pending.',
    }
    setOpen(newObj) // פותח את הדיאלוג עם אובייקט הטרנזאקציה
  }

  const onConfirm = () => {
    if (ref.current) ref.current.value = ''
    setAmountSend(defZero)
  }

  return (
    <div className="flex flex-col space-y-7">
      <ConfirmTransaction open={open} setOpen={setOpen} onConfirm={onConfirm} />
      <h1 className="font-bold text-2xl">Wallets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <YourAssets
          user={user}
          currencies={currencies}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
          isHome={false}
        />

        <div className="flex flex-col space-y-6">
          <CardSwap
            titleA="Receive"
            titleB="Send"
            A={
              <div className="flex flex-col space-y-8 p-10">
                <div className="flex justify-center items-center">
                  <div className="p-4 bg-white rounded shadow">
                    <QRCodeSVG
                      value={currencies?.find(c => c.iso === selectedCoin)?.wallet?.public_key || 'a'}
                      size={170}
                      marginSize={4}
                      level="Q"
                    />
                  </div>
                </div>

                <select
                  className="w-full h-[50px] px-3 border rounded-md"
                  value={selectedCoin}
                  onChange={(e) => setSelectedCoin(e.target.value)}
                >
                  {currencies?.map((currency, c) => (
                    <option key={c} value={currency.iso}>
                      {currency.name} Wallet
                    </option>
                  ))}
                </select>

                <div className="flex fle-row justify-center items-center space-x-3 font-medium text-gray-400">
                  <span className="bg-gray-100 rounded-md py-2 px-4">
                    {currencies?.find(c => c.iso === selectedCoin)?.wallet?.public_key || 'System generating...'}
                  </span>
                  <div
                    onClick={copyFunc}
                    className="hover:bg-gray-100 active:bg-gray-200 cursor-pointer rounded-full p-2"
                  >
                    <Clipboard />
                  </div>
                </div>
              </div>
            }
            B={
              <form className="flex flex-col space-y-6 p-10" onSubmit={sendCrypto}>
                <select
                  className="w-full h-[50px] px-3 border rounded-md"
                  value={selectedCoin}
                  onChange={(e) => setSelectedCoin(e.target.value)}
                >
                  {currencies?.map((currency, c) => (
                    <option key={c} value={currency.iso}>
                      {currency.name} Wallet
                    </option>
                  ))}
                </select>

                <div className="flex flex-col space-y-1">
                  <span className="font-medium">Send to</span>
                  <Input ref={ref} type="text" name="to_public_address" className="h-[46px]" />
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="font-medium">Amount</span>
                  <div className="flex items-center border rounded-md px-3 py-1 focus-within:ring-2 ">
                    <Input
                      type="text"
                      name="amount"
                      value={amountSend}
                      onChange={(e) => setAmountSend(e.target.value)}
                      className="border-0 focus-visible:ring-0 px-0 py-0 shadow-none focus-visible:border-transparent focus:outline-none bg-transparent w-full"
                    />
                    <div className="flex flex-row items-center font-bold space-x-3 text-[14px]">
                      <span className="text-gray-500 font-medium">{selectedCoin}</span>
                      <span
                        className="text-gray-800 hover:text-gray-950 cursor-pointer"
                        onClick={maxAmountFunc}
                      >
                        Max
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button variant="blue">
                    <span className="font-semibold text-[15px]">
                      Send {currencies?.find(c => c.iso === selectedCoin)?.name}
                    </span>
                  </Button>
                </div>
              </form>
            }
          />

          <TransactionsCard isPagination={true} />
        </div>
      </div>
    </div>
  )
}

function ConfirmTransaction({ open, setOpen, onConfirm }) {
  const [loading, setLoading] = useState(false)

  const ConfirmSendCrypto = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await postRequest('/transactions', open)
      toast.success(res.message)
      closeFunc(false)
      onConfirm?.()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Transaction failed')
    } finally {
      setLoading(false)
    }
  }

  const closeFunc = (bool) => {
    if (!bool) setOpen(null)
  }

  return (
    <AlertDialog open={!!open} onOpenChange={closeFunc}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Bitcoin Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to send <strong>{open?.amount} {open?.currency_iso}</strong> to the following address:
            <br />
            <span className="text-sm break-all font-mono text-gray-700">{open?.to_public_address}</span>
            <br /><br />
            Please double-check the recipient address. This action is irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={() => closeFunc(false)}>
            <span>Cancel</span>
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={ConfirmSendCrypto}>
            <span className="font-semibold">Confirm &amp; Send</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
