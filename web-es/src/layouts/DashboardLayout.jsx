import { Outlet, NavLink } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="min-h-dvh">
      <header className="border-b">
        <nav className="container mx-auto flex gap-4 p-4">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/account">Account</NavLink>
          <NavLink to="/payments">Payments</NavLink>
          <NavLink to="/swap">Swap</NavLink>
          <NavLink to="/wallets">Wallets</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </header>
      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}
