// src/pages/dashboard/admin/users/Index.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '@/components/co/container'
import { Input } from '@/components/ui/input'
import { getRequest } from '@/lib/api'

export default function AdminUsers() {
  const [users, setUsers] = useState()
  const [search, setSearch] = useState('')

  const getUsers = async (query = '') => {
    try {
      const res = await getRequest('/users', query ? { search: query } : {})
      // במקור השתמשת ישירות ב-res
      setUsers(res)
    } catch (err) {
      // אפשר להוסיף toast כאן אם תרצה
      // toast.error(err?.response?.data?.message || 'Failed to load users')
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getUsers(search.trim())
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  return (
    <div className="flex flex-col space-y-9">
      <h1 className="font-bold text-2xl leading-4">Users</h1>

      <Input
        placeholder="Search Users"
        className="py-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {users?.map((user) => (
          <Link key={user.id} to={`/admin/users/${user.id}`}>
            <Container p="p-[22px]" bg="bg-white hover:bg-gray-200 cursor-pointer transition-all duration-300">
              <div className="flex flex-row items-center space-x-[24px]">
                <div className="bg-gray-300 w-[60px] h-[60px] p-2 rounded-full relative flex items-center justify-center">
                  <div className="bg-red-600 p-1 border-2 border-white absolute right-0.5 bottom-0.5 rounded-full" />
                  <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                  </svg>
                </div>

                <div className="flex flex-col space-y-[1px] text-sm font-medium flex-grow">
                  <h2 className="font-semibold text-[18px]">{user.email}</h2>
                  <span className="text-gray-600">
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="text-gray-600">Last login: 5/19/2025, 3:21:18 PM</span>
                  <hr className="my-2" />
                  <span className="text-gray-500">Pending Transactions: 0</span>
                  <span className="text-gray-500">In progress Tickets: 0</span>
                </div>
              </div>
            </Container>
          </Link>
        ))}
      </div>
    </div>
  )
}
