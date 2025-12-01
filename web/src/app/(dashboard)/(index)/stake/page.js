"use client"

import Container from "@/components/co/container";
import Ico from "@/components/co/Ico";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  return (
    <div className="flex flex-col space-y-7">
      <h1 className="font-bold text-2xl">Stake Plans</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
        {
          [1, 2, 3, 4, 5, 6].map((item, i) => (
            <StakeContainer key={i} />
          ))
        }
      </div>
    </div>
  );
}

const StakeContainer = ({}) => {
  const [selecet, setSelect] = useState(0)
  return (
    <Container>
      <div className="flex flex-col items-center space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <Ico path="/coins/btc.svg" width="45px" height="45px" />
          <h2 className="font-semibold text-xl text-gray-800">Bitcoin Stake</h2>
        </div>

        <div className="flex text-gray-800 flex-wrap justify-center gap-4 text-[14px] font-medium w-full max-w-md mx-auto [&>button]:cursor-pointer">
          <button onClick={() => setSelect(0)} className={`flex-1 min-w-[40%] max-w-[45%] px-4 py-3.5 border ${selecet == 0 ? "border-blue-500" : "border-gray-500"} rounded-lg`}>
            7 Days
          </button>
          <button onClick={() => setSelect(1)} className={`flex-1 min-w-[40%] max-w-[45%] px-4 py-3.5 border ${selecet == 1 ? "border-blue-500" : "border-gray-500"} rounded-lg`}>
            14 Days
          </button>
          <button onClick={() => setSelect(2)} className={`w-1/2 px-4 py-3.5 border rounded-lg ${selecet == 2 ? "border-blue-500" : "border-gray-500"}`}>
            30 Days
          </button>
        </div>


        <div className="flex flex-col w-full text-[13px] text-gray-500">
          <SmLine A="Rate" B="2.70%" />
          <SmLine A="Min Value" B="0.0052792033 BTC" />
          <SmLine A="Max Value" B="1.0030486343 BTC" />
        </div>

        <Button className="w-full py-4 cursor-pointer">
          <span className="font-semibold text-[17px]">Stake</span>
        </Button>

      </div>
    </Container>
  )
}

const SmLine = ({A, B}) => (
  <div className="flex flex-row justify-between">
    <span className="font-semibold">{A}</span>
    <span className="text-gray-600">{B}</span>
  </div>
) 