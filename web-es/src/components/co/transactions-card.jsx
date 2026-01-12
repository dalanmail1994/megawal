// src/components/co/transactions-card.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

import { getRequest } from '@/lib/api'
import Container from './container'
import TableMain from './table-main'
import { AmountTd, DateTd, DescTd, StatusTd } from '../user-page/transactions-table-element'
import { SeeTransactionModal } from './see-transaction-modal'

export default function TransactionsCard({ isPagination = false }) {
  const [data, setData] = useState()
  const [tran, setTran] = useState()
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
  })

  const getTransactions = async (pageNumber = 1) => {
    setData(null)
    try {
      const res = await getRequest(`/transactions?page=${pageNumber}`)
      setData(res?.data)
      setMeta((prev) => ({
        ...prev,
        last_page: res?.last_page ?? prev.last_page,
        current_page: res?.current_page ?? pageNumber,
      }))
    } catch (err) {
      console.log(err?.response || err)
      setData([]) // fall back to empty list on error
    }
  }

  useEffect(() => {
    getTransactions(meta.current_page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.current_page])

  const nextPage = () =>
    setMeta((prev) => ({ ...prev, current_page: prev.current_page + 1 }))

  const prevPage = () =>
    setMeta((prev) => ({ ...prev, current_page: prev.current_page - 1 }))

  return (
    <Container p="p-0">
      <SeeTransactionModal tran={tran} setTran={setTran} showEdit={false} showCreator={false} />
      <div className="flex flex-col">
        <div className="flex flex-col p-[22px]">
          <h2 className="font-bold text-lg">Recent Transactions</h2>
          <span className="text-gray-400 text-sm font-medium">View your recent transactions</span>
        </div>

        <div className="pt-0">
          {data?.length === 0 && (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center space-y-4">
                <img src="/flags/ic-content.svg" className="w-[160px]" />
                <h2 className="font-semibold text-lg text-gray-400">No transactions yet</h2>
                <span className="text-xs text-gray-400">All caught up!</span>
              </div>
            </div>
          )}

          {data?.length !== 0 && data && (
            <TableMain
              headData={[
                { key: 'Desc', title: 'Descreption', Element: DescTd },
                { key: 'date', title: 'Date',        Element: DateTd },
                { key: 'amount', title: 'Amount',    Element: AmountTd },
                { key: 'status', title: 'Status',    Element: StatusTd },
              ]}
              data={data}
              click={setTran}
            />
          )}
        </div>

        <div className="flex flex-col">
          <hr className="w-full relative border-t border-dotted border-gray-300" />
          <div className="flex justify-end p-4 text-[15px] font-semibold">
            {isPagination ? (
              <div className="flex flex-row items-center space-x-[1px]">
                <LinkBut
                  title="Previous Page"
                  click={prevPage}
                  active={meta?.current_page > 1}
                />
                <LinkBut
                  title="Next Page"
                  click={nextPage}
                  active={meta?.current_page < meta?.last_page}
                />
              </div>
            ) : (
              <Link
                to="/wallets"
                className="flex flex-row items-center space-x-2 hover:bg-gray-100 transition-all duration-400 cursor-pointer pl-2 pr-1 rounded-sm"
              >
                <span>View All</span>
                <ChevronRight className="w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

function LinkBut({ title, active, click }) {
  return (
    <span
      onClick={active ? click : () => {}}
      className={`transition-all duration-400 px-2 rounded-sm ${
        active ? 'hover:bg-gray-100 cursor-pointer' : 'font-medium text-gray-500'
      }`}
    >
      {title}
    </span>
  )
}
