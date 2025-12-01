// src/components/co/chat-box.jsx
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Container from '@/components/co/container'
import { Input } from '@/components/ui/input'
import { InputIco } from '@/components/ui/input-ico'
import { InputChat } from '@/components/ui/input-chat'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CreateTicketModal } from './create-ticket-modal'
import { getRequest, postRequest } from '@/lib/api'
import { useUser } from '@/context/UserContext'

export default function ChatBox({ userId }) {
  const [isInfo, setIsInfo] = useState(false)
  const [tickets, setTickets] = useState()
  const { pathname } = useLocation()
  const { user } = useUser()
  const [chosedTicket, setChosedTicket] = useState()
  const [messages, setMessages] = useState()
  const [content, setContent] = useState('')

  useEffect(() => {
    if (chosedTicket) {
      getMessage(chosedTicket?.id)
    }
  }, [chosedTicket])

  const getMessage = async (id) => {
    try {
      const res = await getRequest(`/tickets/${id}/messages`)
      setMessages(res)
    } catch (err) {
      // handle error silently
    }
  }

  const getTickets = async () => {
    try {
      const res = await getRequest('/tickets', { all: pathname.includes('/admin/'), userid: userId })
      setTickets(res)
    } catch (err) {
      // handle error silently
    }
  }

  useEffect(() => {
    getTickets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault()
    const obj = {
      ticket_id: chosedTicket?.id,
      content: content,
      is_admin: pathname === '/admin/tickets',
    }
    try {
      await postRequest('/messages', obj)
      // רענון הודעות לאחר שליחה
      if (chosedTicket?.id) {
        getMessage(chosedTicket.id)
      }
    } catch (err) {
      // handle error silently
    } finally {
      setContent('')
    }
  }

  const noTicketSelected = messages == null && chosedTicket == undefined

  return (
    <Container p="p-0 flex flex-row flex-grow">
      {/* רשימת טיקטים - צד A */}
      <div className="flex flex-col w-full max-w-[320px] border-r">
        <div className="p-4 flex flex-col space-y-4">
          <div className="flex flex-row items-center justify-between">
            <CirAcc />
            {pathname !== '/admin/tickets' && <CreateTicketModal getTickets={getTickets} />}
          </div>

          <InputIco placeholder="Search Tickets..." ico={<Search className="text-gray-500" />} />

          {user?.user_type_id < 3 && (
            <select className="px-3 border h-[36px] rounded-md">
              <option>All</option>
              <option>Open Tickets</option>
              <option>Closed Tickets</option>
            </select>
          )}
        </div>

        <div className="flex-grow flex flex-col h-[500px] overflow-y-scroll">
          {tickets?.map((ticket, t) => (
            <LineTicket key={t} ticket={ticket} setChosedTicket={setChosedTicket} />
          ))}
        </div>
      </div>

      {/* צד B - אזור השיחה */}
      <div className="flex flex-col items-strech flex-grow">
        {/* Header */}
        <div className="flex flex-row space-x-3 p-4 border-b">
          <Cir width="w-[40px]" height="h-[40px]">
            <svg fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
          </Cir>

          <div className="flex flex-col flex-grow">
            <span className="font-semibold text-[15px]">{chosedTicket?.creator?.email}</span>
            <span className="text-sm text-gray-500 font-medium">Open</span>
          </div>

          {pathname === '/admin/tickets' && !noTicketSelected && (
            <div className="flex items-center justify-center">
              <div
                onClick={() => setIsInfo((prev) => !prev)}
                className="hover:bg-gray-100 transition-all duration-400 cursor-pointer rounded-full w-7 h-7 flex items-center justify-center"
              >
                <svg width="20px" viewBox="0 0 24 24">
                  <path
                    fill="#637381"
                    d="M13 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h9zm2 18V3h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1zM7 8.5l4 3.5l-4 3.5z"
                  ></path>
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* CHATS */}
        <div className="flex flex-row h-full">
          {/* הודעות */}
          <div className="flex flex-col items-stretch flex-grow w-0">
            <div className="flex flex-col p-4 space-y-2 h-[550px] overflow-y-scroll">
              {noTicketSelected && (
                <div className="flex-grow flex items-center justify-center">
                  <img src="/ic-chat-active.svg" />
                </div>
              )}

              {messages == null && chosedTicket !== undefined && <span>Loading...</span>}

              {messages?.map((message, m) => (
                <Message key={m} i={m} message={message} pathname={pathname} />
              ))}
            </div>

            <form onSubmit={sendMessage} className="flex-grow flex flex-row items-center px-4 border-t py-2">
              <InputChat
                placeholder="Type a message"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={noTicketSelected}
              />
              <Button type="submit" disabled={noTicketSelected}>
                Send
              </Button>
            </form>
          </div>

          {/* צד C – פנל מידע (אדמין) */}
          <div
            className={`${isInfo ? '' : 'hidden'} w-full max-w-[280px] border-l flex flex-col space-y-6 items-center justify-between pt-8 pb-4`}
          >
            <div className="flex flex-col space-y-4 items-center">
              <Cir width="w-[70px]" height="h-[70px]">
                <svg className="p-[6px]" fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                </svg>
              </Cir>
              <div className="flex flex-col space-y-2 items-center">
                <h2 className="font-semibold text-[16px]">{chosedTicket?.creator?.email}</h2>
                <span className="font-medium text-gray-400 text-[15px] leading-none">open</span>
              </div>
            </div>

            <div className="w-full flex flex-col space-y-4 p-3">
              <Button className="bg-orange-600">Close Ticket</Button>

              <div className="flex flex-col space-y-[2px]">
                <span className="text-[13px] font-medium text-gray-700">Support Name</span>
                <Input defaultValue="Support" />
              </div>

              <Button>Update Admin Name</Button>

              <div className="p-3 bg-[#cafdf5] rounded-md flex flex-row items-start space-x-2">
                <svg className="text-sm w-[50px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    fill="#00b8d9"
                    fillRule="evenodd"
                    d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-10 5.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75M12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="text-sm font-medium text-[#003768]">
                  Admin Name is used for every ticket, changing it will affect all messages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

function Message({ i, message, pathname }) {
  const right = pathname === '/admin/tickets' ? message.is_admin : !message.is_admin

  return (
    <div className={`flex flex-row space-x-2 ${right ? '' : 'flex-row-reverse space-x-reverse'}`}>
      <Cir width="w-[35px]" height="h-[35px]" bg="bg-[#00b8d9]">
        <svg className="p-[6px]" fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
        </svg>
      </Cir>

      <div className={`flex flex-col space-y-1 ${right ? '' : 'items-end'} text-xs`}>
        <div className={`flex flex-row space-x-2 ${right ? '' : 'flex-row-reverse space-x-reverse'}`}>
          {right ? <span>pewenger@pm.me</span> : null}
          <span className="text-gray-600">6 days</span>
        </div>

        <div className="bg-gray-200 rounded-md p-2 w-full max-w-[400px]">
          {message.content}
        </div>
      </div>
    </div>
  )
}

function LineTicket({ ticket, setChosedTicket }) {
  return (
    <div
      className="flex flex-row cursor-pointer items-center px-4 py-3 hover:bg-gray-100 space-x-3"
      onClick={() => setChosedTicket(ticket)}
    >
      <Cir>
        <svg className="p-[6px]" fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
        </svg>
      </Cir>

      <div className="flex flex-col flex-grow">
        <span className="font-semibold text-[15px]">{ticket?.subject}</span>
        <span className="text-sm text-gray-600">{ticket?.creator?.email}</span>
      </div>

      <div className="text-xs font-medium text-gray-500 h-full">
        <span>6 days</span>
      </div>
    </div>
  )
}

function CirAcc() {
  return (
    <div className="w-[48px] relative">
      <div className="w-[48px] h-[48px] bg-green-500 rounded-full flex items-center justify-center font-bold">
        <span className="text-white text-xl">MH</span>
      </div>
      <div className="bg-green-500 w-[10px] h-[10px] absolute right-0 bottom-0 rounded-full"></div>
    </div>
  )
}

function Cir({ children, width = 'w-[48px]', height = 'h-[48px]', bg = 'bg-gray-300' }) {
  return <div className={`flex items-center justify-center ${width} ${height} ${bg} rounded-full`}>{children}</div>
}
