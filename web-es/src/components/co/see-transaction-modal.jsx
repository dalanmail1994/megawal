// src/components/co/see-transaction-modal.jsx
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { BsFillClockFill } from 'react-icons/bs'
import { FaCheckCircle } from 'react-icons/fa'
import { IoIosCloseCircle } from 'react-icons/io'
import { EditTransactionModal } from './edit-transaction-modal'

export function SeeTransactionModal({ tran, setTran, getTransactions, showEdit = true }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (tran) setOpen(true)
  }, [tran])

  const handleOpen = (bool) => {
    setOpen(bool)
    if (!bool) setTran?.(null)
  }

  const StatusIcon = () => {
    if (tran?.status === 'completed') return <FaCheckCircle className="text-[60px] text-green-500" />
    if (tran?.status === 'failed') return <IoIosCloseCircle className="!text-[75px] text-red-500" />
    return <BsFillClockFill className="text-[60px] text-[#ffab00]" />
  }

  const statusTitle =
    tran?.status === 'completed'
      ? 'Received Successfully'
      : tran?.status === 'failed'
      ? 'Transaction Failed'
      : 'Transaction Pending...'

  const addr = tran?.mod ? tran?.from_public_address : tran?.to_public_address
  const currencyIso = tran?.currency?.iso || tran?.currency_iso || ''
  const amountText = `${tran?.amount ?? ''} ${currencyIso}`

  const formattedDate =
    tran?.date &&
    new Date(tran.date).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-5 items-center text-center">
          {/* Banner: creator */}
          <div className="p-3 bg-[#cafdf5] rounded-md flex flex-row items-center space-x-3">
            <svg className="text-sm w-[30px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
              <path
                fill="#00b8d9"
                fillRule="evenodd"
                d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-10 5.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75M12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="text-sm font-medium text-[#003768]">
              This transaction was added by {tran?.creator?.email}
            </p>
          </div>

          {/* Status icon */}
          <StatusIcon />

          {/* Title + address */}
          <div className="flex flex-col">
            <h1 className="text-[24px] font-bold">{statusTitle}</h1>
            <span className="text-[14px] text-gray-800 break-all">{addr}</span>
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <h1 className="text-[24px] font-extrabold">{amountText}</h1>
            <span className="text-[14px] text-gray-800">≈449402.02377295 USD</span>
          </div>

          {/* Description / Note */}
          {tran?.descreption && (
            <div className="p-3 bg-[#fff5cc] rounded-md flex flex-row items-center space-x-3 w-full">
              <p className="text-sm font-medium text-[#7f4808] text-start" style={{ whiteSpace: 'pre-line' }}>
                {tran.descreption}
              </p>
            </div>
          )}

          {/* Key details */}
          {[
            { key: 'Transaction Hash', value: tran?.transaction_hash },
            { key: 'Transaction Date', value: formattedDate },
          ].map(
            (item, i) =>
              item.value && (
                <div key={i} className="flex flex-col font-medium">
                  <span className="text-sm text-gray-600">{item.key}</span>
                  <span className="text-md break-all">{item.value}</span>
                </div>
              ),
          )}

          {/* Edit modal */}
          {showEdit && (
            <EditTransactionModal tran={tran} handleOpen={handleOpen} getTransactions={getTransactions} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
