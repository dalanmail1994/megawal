import { Outlet, NavLink } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <NavLink to="/admin" end>Overview</NavLink>
        <NavLink to="/admin/agency">Agency</NavLink>
        <NavLink to="/admin/payments">Payments</NavLink>
        <NavLink to="/admin/stakes">Stakes</NavLink>
        <NavLink to="/admin/tickets">Tickets</NavLink>
        <NavLink to="/admin/transactions">Transactions</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
      </div>
      <Outlet />
    </div>
  )
}
