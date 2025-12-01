// src/pages/auth/SignUp.jsx
import Container from '@/components/co/container'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import { postRequest } from '@/lib/api'
import { formDataToObject } from '@/lib/utils'

import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function SignUp() {
  // UI state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Navigation
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/'

  // Submit handler
  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.target)
    const obj = formDataToObject(formData)

    try {
      const res = await postRequest('/users', obj)
      // Persist auth token
      if (res?.token) {
        localStorage.setItem('authToken', res.token)
      }
      // Navigate to dashboard/home (or the originally requested path)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      // Keep error messages in English by default (your preference)
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Registration failed. Please try again.'
      setError(msg)
      console.error('SignUp error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container s="shadow-md" w="max-w-[420px] w-full">
      <div className="flex flex-col items-center space-y-8 py-4">
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-full p-6">
          <img src="/flags/logo.svg" alt="Logo" className="h-[40px]" />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <h2 className="font-extrabold text-xl">Get started absolutely free</h2>
          <div className="flex flex-row space-x-1 text-[0.875rem]">
            <span className="text-gray-500">Already have an account?</span>
            <Link to="/login" className="text-blue-600 font-semibold">
              Sign in
            </Link>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 w-full" noValidate>
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" name="first_name" placeholder="John" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" name="last_name" placeholder="Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" name="email" placeholder="you@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" name="password" placeholder="********" />
          </div>

          {error ? (
            <span className="text-sm font-medium text-red-500">{error}</span>
          ) : null}

          <Button
            className="w-full mt-4 font-bold py-6 bg-gray-900"
            disabled={loading}
            type="submit"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </Button>
        </form>

        <div className="text-center text-[12px] font-medium text-gray-400">
          <span>
            By signing up, I agree to{' '}
            <span className="underline text-gray-700">Terms of service</span> and{' '}
            <span className="underline text-gray-700">Privacy policy</span>.
          </span>
        </div>
      </div>
    </Container>
  )
}
