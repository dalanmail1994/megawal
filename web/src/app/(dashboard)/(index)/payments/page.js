'use client'

import CardSwap from "@/components/co/card-swap";
import ContainerViewAll from "@/components/co/container-view-all";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRequest } from "@/lib/api";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  



  // const getTransactions = async () => {

  //   try {
  //       const res = await getRequest("/transactions");
  //       console.log(res)
  //       // toast.success(res.message)
  //   } catch (err) {
  //     console.log(err.response)
  //       // toast.error(err.response.data.message)
  //   } finally {

  //   }
  // }


  // useEffect(() => {
  //   getTransactions()
  // }, [])



  return (
    <div className="flex flex-col space-y-7">
      <h1 className="font-bold text-2xl">Buy / Sell</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <CardSwap
            titleA="Buy Crypto"
            titleB="Sell Crypto"
            A={
              <div className="flex flex-col space-y-8 p-10">
                <select className="w-full h-[50px] px-3 border rounded-md">
                  <option>Bitcoin Wallet</option>
                </select>
                <div className="flex fle-row justify-center items-center space-x-3 font-medium text-gray-400">
                  <span className="bg-gray-100 rounded-md py-2 px-4">System generating...</span>
                </div>
              </div>
            }
            B={
              <div className="flex flex-col space-y-6 p-10">
                <select className="w-full h-[50px] px-3 border rounded-md">
                  <option>Bitcoin Wallet</option>
                </select>
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">Send to</span>
                  <Input type="text" placeholder="..." />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">Amount</span>
                  <Input type="text" defaultValue="0.000000" />
                </div>
                <div className="flex justify-center">
                  <Button disabled={true}>Send Bitcoin</Button>
                </div>
              </div>
            }
          />
        </div>
        <ContainerViewAll
          title="Recent Payments"
          subTitle="View your recent payments"
          viewAll={false}
        >
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center space-y-4">
              <img src="/flags/ic-content.svg" className="w-[160px]" />
              <h2 className="font-semibold text-lg text-gray-400">No payments yet</h2>
              <span className="text-xs text-gray-400">All caught up!</span>
            </div>
          </div>
        </ContainerViewAll>
      </div>
    </div>
  );
}
