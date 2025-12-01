"use client"

import Ico from "@/components/co/Ico";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button"
import Container from "@/components/co/container";
import ContainerViewAll from "@/components/co/container-view-all";
import ItemCoin from "@/components/co/item-coin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useInfo } from "@/context/InfoContext";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import TransactionsCard from "@/components/co/transactions-card";
import YourAssets from "@/components/co/your-assets";
import { Skeleton } from "@/components/ui/skeleton"


export default function Home() {
  const router = useRouter()
  const { currencies } = useInfo()
  const { user } = useUser();

  return (
    <div className="flex flex-col space-y-7">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <Con href="/payments" title="Buy Crypto" des="Buy crypto with robust providers" path="/flags/ic-banking.svg" />
        <Con href="/swap" title="Swap" des="Crypto to crypto conversion" path="/flags/ic-swap.svg" />
        <Con href="/stake" title="Stake" des="Grow your crypto portfolio" path="/flags/ic-savings.svg" />
      </div>
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-col font-semibold">
          <h2 className="text-lg text-gray-500">Total Balance</h2>
          <span className="text-[26px] font-bold">{user?.main_coin?.symbole}{user?.balance}</span>
          <span className="text-xs text-gray-400">Available Balance {user?.main_coin?.symbole}{user?.balance}</span>
        </div>
        <div className="flex flex-row space-x-2">
          <Button className="cursor-pointer" onClick={() => router.push('/wallets')}><span className="font-bold">Deposit</span></Button>
          <Button className="cursor-pointer" onClick={() => router.push('/wallets')} variant="outline"><span className="font-bold">Withdraw</span></Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col space-y-6">
          <Container bg="bg-gradient-to-br from-[#0c67e7] to-[#063da9]" p="p-[26px]">
            <div className="text-white text-lg space-y-4 lg:p-[14px] relative">
              <h2 className="font-medium ">Invite Friends and Earn</h2>
              <div>
                <span className="font-black text-4xl">$50</span>
              </div>
              <p className="text-sm">
                Invite your friends to join our crypto community and earn $50 for each friend that signs up.
              </p>
              <img className="w-[120px] absolute top-[-20px] right-[-20px]" src="/flags/illustration-receipt.webp" />
              <div className="bg-[#073b9d] rounded-md flex flex-row w-full p-1">
                <input placeholder="Email" className="w-full pl-2 focus:outline-none" />
                <button className="bg-[#2852a0] hover:bg-[#3D63A9] cursor-pointer rounded-lg flex items-center justify-center py-1 px-3">
                  <span className="text-[13px] font-semibold">Invite</span>
                </button>
              </div>
            </div>
          </Container>


          <Container className="!p-0">
            <YourAssets user={user} currencies={currencies?.slice(0,7)} isHome={true}  />
            <div className="flex flex-col">
              <hr className="w-full relative border-t border-dotted border-gray-300" />
              <div className="flex justify-end p-4 text-[15px] font-semibold">        
                <Link href={'/wallets'} className="flex flex-row items-center space-x-2 hover:bg-gray-100 transition-all duration-400 cursor-pointer pl-2 pr-1 rounded-sm">
                  <span>View All</span>
                  <ChevronRight className="w-4" />
                </Link>
              </div>
            </div>
          </Container>

        </div>
        <div className="md:col-span-2">
          <TransactionsCard isPagination={false} />
        </div>
      </div>
    </div>
  );
}



const Con = ({ title, des, path, href="/" }) => {
  return (
    <Link href={href} className="bg-[#f4f6f8] hover:bg-white hover:shadow-md transition-all duration-400 cursor-pointer font-medium rounded-xl p-[24px] flex flex-row items-center space-x-6">
      <Ico path={path} />
      <div className="flex-grow">
        <div className="flex flex-col space-y-1">
          <h2 className="font-semibold text-lg">{title}</h2>
          <span className="text-sm text-gray-600">{des}</span>
        </div>
      </div>
      <ChevronRight />
    </Link>
  )
}