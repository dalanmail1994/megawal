import ChatBox from "../co/chat-box";


export default function TicketPage ({userId}) {


    return (
        <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold">Support Tikects</h2>
            <ChatBox userId={userId} />
        </div>
    )
}
