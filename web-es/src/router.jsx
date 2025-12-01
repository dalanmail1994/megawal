// src/router.jsx
import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ProtectedRoute from './guards/ProtectedRoute.jsx'

// Layouts
const AuthLayout       = lazy(() => import('@/layouts/AuthLayout.jsx'))
const ProvidersLayout  = lazy(() => import('@/layouts/ProvidersLayout.jsx'))
const IndexShellLayout = lazy(() => import('@/layouts/IndexShellLayout.jsx'))
const AdminShellLayout = lazy(() => import('@/layouts/AdminShellLayout.jsx'))

// Auth pages
const Login  = lazy(() => import('@/pages/auth/Login.jsx'))
const SignUp = lazy(() => import('@/pages/auth/SignUp.jsx'))

// Dashboard pages ((dashboard)/(index)/*)
const DashboardHome = lazy(() => import('@/pages/dashboard/Index.jsx'))
const Account       = lazy(() => import('@/pages/dashboard/Account.jsx'))
const Payments      = lazy(() => import('@/pages/dashboard/Payments.jsx'))
const Stake         = lazy(() => import('@/pages/dashboard/Stake.jsx'))
const Support       = lazy(() => import('@/pages/dashboard/Support.jsx'))
const Swap          = lazy(() => import('@/pages/dashboard/Swap.jsx'))
const Wallets       = lazy(() => import('@/pages/dashboard/Wallets.jsx'))

// Admin pages ((dashboard)/admin/*)
const AdminHome        = lazy(() => import('@/pages/dashboard/admin/Index.jsx'))
const AdminAgency      = lazy(() => import('@/pages/dashboard/admin/Agency.jsx'))
const AdminPayments    = lazy(() => import('@/pages/dashboard/admin/Payments.jsx'))
const AdminStakes      = lazy(() => import('@/pages/dashboard/admin/Stakes.jsx'))
const AdminTickets     = lazy(() => import('@/pages/dashboard/admin/Tickets.jsx'))
const AdminTransactions= lazy(() => import('@/pages/dashboard/admin/Transactions.jsx'))
const AdminUsers       = lazy(() => import('@/pages/dashboard/admin/users/Index.jsx'))
const AdminUserDetails = lazy(() => import('@/pages/dashboard/admin/users/UserDetails.jsx'))

const NotFound  = () => <div className="p-8">404</div>
const ErrorPage = () => <div className="p-8">Something went wrong</div>

// helper לעטוף ב-Suspense
const $ = (el) => <Suspense fallback={<div />}>{el}</Suspense>

export const router = createBrowserRouter([
  // קבוצת ה-(auth) => /login, /sign-up
  {
    path: '/',
    element: $(<AuthLayout />),
    children: [
      { path: 'login',   element: $(<Login />) },
      { path: 'sign-up', element: $(<SignUp />) },
    ],
  },

  // protected area -> providers -> shells
  {
    path: '/',
    element: $(
      <ProtectedRoute>
        <ProvidersLayout />
      </ProtectedRoute>
    ),
    errorElement: $(<ErrorPage />),
    children: [
      // (index) shell
      {
        element: $(<IndexShellLayout />),
        children: [
          { index: true, element: $(<DashboardHome />) }, // "/"
          { path: 'account',    element: $(<Account />) },
          { path: 'payments',   element: $(<Payments />) },
          { path: 'stake',      element: $(<Stake />) },
          { path: 'support',    element: $(<Support />) },
          { path: 'swap',       element: $(<Swap />) },
          { path: 'wallets',    element: $(<Wallets />) },
        ],
      },

      // /admin/* (מקביל ל-(dashboard)/admin)
      {
        path: 'admin',
        element: $(<AdminShellLayout />),
        children: [
          { index: true,         element: $(<AdminHome />) },           // /admin
          { path: 'users',       element: $(<AdminUsers />) },        // /admin/users
          { path: 'users/:id',   element: $(<AdminUserDetails />) },  // /admin/users/[id]
          { path: 'tickets',     element: $(<AdminTickets />) },
          { path: 'agency',      element: $(<AdminAgency />) },
          { path: 'payments',    element: $(<AdminPayments />) },
          { path: 'stakes',      element: $(<AdminStakes />) },
          { path: 'transactions',element: $(<AdminTransactions />) },
        ],
      },
    ],
  },

  { path: '*', element: $(<NotFound />) },
])
