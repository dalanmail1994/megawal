import Container from "@/components/co/container";
import Ico from "@/components/co/Ico";
import { Input } from "@/components/ui/input";
import { InputIco } from "@/components/ui/input-ico";
import { InputChat } from "@/components/ui/input-chat";
import { Paperclip, Search } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="flex flex-col space-y-7 min-h-[400px] h-[calc(100vh-220px)]">
      <h1 className="font-bold text-2xl">Support Tickets</h1>
      <Container p="p-0 flex flex-row flex-grow">
        <div className="flex flex-col w-full max-w-[320px] border-r">
          <div className="p-4 flex flex-col space-y-4">
            <CirAcc />
            <InputIco placeholder="Search Tickets..." ico={<Search className="text-gray-500" />} />
            <select className="px-3 border h-[36px] rounded-md">
              <option>All</option>
              <option>Open Tickets</option>
              <option>Closed Tickets</option>
            </select>
          </div>
          <div className="flex-grow flex flex-col overflow-y-scroll">
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => (
                <LineChats key={i} />
              ))
            }
          </div>
        </div>
        {/* B side */}
        <div className="flex-grow flex flex-col bg-green-400">
          <div className="flex flex-row space-x-3 p-4 border-b">
            <Cir width="w-[40px]" height="h-[40px]">
              <svg className="" fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonIcon"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
            </Cir>
            <div className="flex flex-col flex-grow">
              <span className="font-semibold text-[15px]">Identity Verification</span>
              <span className="text-sm text-gray-500 font-medium">Open</span>
            </div>
          </div>
          {/* conversation box */}
          <div className="flex flex-row">
            <div className="p-4 flex-grow flex flex-col space-y-4 overflow-y-scroll h-[250px]">
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                  <Message key={i} i={i} />
                ))
              }
            </div>

            {/* CC side */}
            <div className="border-l flex flex-col space-y-4 items-center bg-blue-500">
              <div className="flex flex-col space-y-4 items-center py-8 px-2">
                <Cir bg="bg-gray-300" width="w-[85px]" height="h-[85px]">
                  <svg className="p-[6px]" fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonIcon"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                </Cir>
                <div className="flex flex-col space-y-2 items-center">
                  <span className="text-center font-semibold text">Identity Verification</span>
                  <span className="text-sm text-gray-400 font-medium">open</span>
                </div>
              </div>

              <div className="flex flex-col bg-red-600">
                <div className="w-full">
                  <select className="bg-gray-100 w-full py-3 px-4 text-xs font-bold text-gray-500">
                    <option>ACTIONS</option>
                  </select>
                </div>
                <div className="flex flex-col  px-2 space-y-4 justify-center h-full w-full">
                  <Button className="bg-[#ff5630] text-sm">
                    <span className="font-bold">Close Ticket</span>
                  </Button>
                  <Input type="text" placeholder="Name" defaultValue="Support" />
                  <Button>
                    <span className="font-bold">Close Ticket</span>
                  </Button>
                </div>
                <div className="p-2">
                  <Container bg="bg-[#cafdf5]" p="p-[24px]" s="" b="">
                    A
                  </Container>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row border-t px-4 py-3 space-x-2">
            <input className="flex-grow focus:outline-none text-sm" placeholder="Type a message" />
            <div className="flex flex-row items-center space-x-4">
              <Paperclip className="w-4 text-gray-500" />
            </div>
          </div>
        </div>

      </Container>

    </div>
  );
}


const Message = ({ i }) => {

  return (
    <div className={`flex flex-row space-x-2 ${i == 2 ? "" : "flex-row-reverse space-x-reverse"}`}>
      <Cir width="w-[35px]" height="h-[35px]">
        <svg className="p-[6px]" fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonIcon"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
      </Cir>
      <div className={`flex flex-col space-y-1 ${i == 2 ? "" : "items-end"} text-xs`}>
        <div className="flex flex-row space-x-2">
          <span className="">6 days</span>
          <span className="">pewenger@pm.me</span>
        </div>
        <div className="bg-gray-200 rounded-md p-2 max-w-1/2">
          The error as shown on the printscreen hasn't reappeared after 2 Logins and logouts again. The question remains, may I Install the 2 factor authentication?
        </div>
      </div>
    </div>
  )
}


const LineChats = ({ }) => (
  <div className="flex flex-row cursor-pointer items-center px-4 py-3 hover:bg-gray-100 space-x-3">

    <Cir>
      <svg className="p-[6px]" fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonIcon"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
    </Cir>

    <div className="flex flex-col flex-grow">
      <span className="font-semibold text-[15px]">Identity Verification</span>
      <span className="text-sm text-gray-600">pewenger@pm.me</span>
    </div>
    <div className="text-xs font-medium text-gray-500 h-full">
      <span>6 days</span>
    </div>
  </div>
)



const CirAcc = ({ }) => (
  <div className="w-[48px] relative">
    <div className="w-[48px] h-[48px] bg-green-500 rounded-full flex items-center justify-center font-bold text">
      <span className="text-white text-xl">MH</span>
    </div>
    <div className="bg-green-500 w-[10px] h-[10px] absolute right-0 bottom-0 rounded-full">
    </div>
  </div>
)

const Cir = ({ children, width = "w-[48px]", height = "h-[48px]", bg = "bg-gray-300" }) => (
  <div className={`flex items-center justify-center ${width} ${height} ${bg} rounded-full`}>
    {children}
  </div>
)