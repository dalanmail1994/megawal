// src/pages/dashboard/admin/Transactions.jsx
import TransactionsPage from '@/components/user-page/transactions'

export default function AdminTransactions() {
  return (
    <div className="flex flex-col space-y-9">
      <h1 className="font-bold text-2xl leading-4">Transactions</h1>
      <TransactionsPage all />
    </div>
  )
}
