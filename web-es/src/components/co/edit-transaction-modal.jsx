// src/components/co/edit-transaction-modal.jsx
import { useEffect, useState, useMemo } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { deleteRequest, putRequest } from '@/lib/api'
import { formDataToObject } from '@/lib/utils'
import CardSwapDepoWith from './card-swap-depo-with'
import { useInfo } from '@/context/InfoContext'
import { toast } from 'sonner'

export function EditTransactionModal({ tran, handleOpen, getTransactions }) {
  const { currencies } = useInfo()
  const [open, setOpen] = useState(false)
  const [mod, setMood] = useState(Boolean(tran?.mod)) // true=Deposit, false=Withdraw
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMood(Boolean(tran?.mod))
  }, [tran])

  // datetime-local expects "YYYY-MM-DDTHH:mm"
  const defaultDate = useMemo(() => {
    if (!tran?.date) return ''
    try {
      return new Date(tran.date).toISOString().slice(0, 16)
    } catch {
      return ''
    }
  }, [tran?.date])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    const obj = formDataToObject(formData)

    try {
      const res = await putRequest(`/transactions/${tran?.id}`, {
        ...obj,
        mod,
      })
      toast.success(res?.message || 'Transaction updated')
      getTransactions?.()
      setOpen(false)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update transaction')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await deleteRequest(`/transactions/${tran?.id}`)
      toast.success(res?.message || 'Transaction deleted')
      getTransactions?.()
      setOpen(false)
      // סוגר גם את המודל האב אם צריך
      handleOpen?.(false)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete transaction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <span className="font-bold">Edit Transaction</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="px-0">
        <DialogHeader className="px-6">
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>

        {/* במקור העברת setMood=null כדי לא לאפשר שינוי מצב; נשמר כך */}
        <CardSwapDepoWith mod={mod} setMood={null} />

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 px-6">
          <div className="p-3 bg-[#cafdf5] rounded-md flex flex-row items-center space-x-2">
            <svg className="text-sm w-[22px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
              <path
                fill="#00b8d9"
                fillRule="evenodd"
                d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-10 5.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75M12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="text-sm font-medium text-[#003768]">
              {mod ? 'You are depositing to user wallet.' : 'You are withdrawing from user wallet.'}
            </p>
          </div>

          <div className="space-y-4 flex flex-col">
            {/* Currency */}
            <select
              className="sel"
              defaultValue={tran?.currency?.iso || tran?.currency_iso}
              name="currency_iso"
            >
              {currencies?.map((currency, c) => (
                <option key={c} value={currency.iso}>
                  {currency.name}
                </option>
              ))}
            </select>

            {/* Amount */}
            <Input
              type="text"
              name="amount"
              placeholder="Transaction Amount"
              defaultValue={tran?.amount}
              required
            />

            {/* Date/Time */}
            <Input
              type="datetime-local"
              name="date"
              placeholder="Sent At"
              required
              defaultValue={defaultDate}
            />

            {/* Status */}
            <select className="sel" defaultValue={tran?.status} name="status">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>

            {/* Hash */}
            <Input
              type="text"
              name="transaction_hash"
              placeholder="Transaction Hash"
              required
              defaultValue={tran?.transaction_hash}
            />

            {/* From/To public address */}
            <Input
              type="text"
              name={mod ? 'from_public_address' : 'to_public_address'}
              placeholder={mod ? 'From Address' : 'To Address'}
              required
              defaultValue={mod ? tran?.from_public_address : tran?.to_public_address}
            />

            {/* Note (שומר את שם השדה כמו בשרת: descreption) */}
            <Textarea
              className="h-[120px]"
              name="descreption"
              placeholder="Note"
              required
              defaultValue={tran?.descreption}
            />
          </div>

          <DialogFooter>
            <div className="w-full flex flex-row items-center justify-between">
              <Button
                type="button"
                variant="destructive"
                disabled={loading}
                onClick={handleDelete}
              >
                Delete
              </Button>

              <div className="flex flex-row items-center space-x-2">
                <DialogClose asChild className="flex">
                  <Button type="button" variant="outline" disabled={loading}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>
                  Update Transaction
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
