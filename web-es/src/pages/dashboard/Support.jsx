// src/pages/dashboard/Support.jsx
import ChatBox from '@/components/co/chat-box'

export default function Support() {
  return (
    <div className="flex flex-col space-y-7">
      <h1 className="font-bold text-2xl">Support Tickets</h1>
      <ChatBox />
    </div>
  )
}
