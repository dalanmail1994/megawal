"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getRequest } from "@/lib/api";
import MenuUser from "@/components/co/menu-user";
import ProfilePage from "@/components/user-page/profile";
import WalletPage from "@/components/user-page/wallet";
import TransactionsPage from "@/components/user-page/transactions";
import TicketPage from "@/components/user-page/ticket";
import KycPage from "@/components/user-page/kyc";
import PaymentPage from "@/components/user-page/payment";
import StakePage from "@/components/user-page/stake";
import LogsPage from "@/components/user-page/logs";

export default function UserPage() {
    const { id } = useParams();
    const [user, setUser] = useState()
    const [index, setIndex] = useState(0)

    const pages = [
        <ProfilePage user={user} setUser={setUser} />,
        <WalletPage userId={id} user={user} />,
        <TransactionsPage userId={id} />,
        <TicketPage userId={id} />,
        <KycPage userId={id} />,
        <PaymentPage userId={id} />,
        // <StakePage />,
        <LogsPage userId={id} />
    ]



    const getUser = async () => {
        try {
            const res = await getRequest(`/users/${id}`);
            setUser(res)
        } catch (err) {

        } finally {

        } 
    }
    useEffect(() => {
        getUser()
    }, [])
  

  return (
    <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1">
            <div className="flex flex-row bg-[#344a8c] rounded-lg p-8 space-x-6 items-center">
                <div className="w-[80px] h-[80px] border-2 border-white bg-[#4b5e94] rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-semibold">
                        {user?.first_name.slice(0,1)}
                    </span>
                </div>
                <div className="flex flex-col space-y-1">
                    <h2 className="text-2xl text-white font-extrabold">{user?.first_name} {user?.last_name}</h2>
                    <span className="text-gray-300 font-medium">{user?.email}</span>
                </div>
            </div>
            <MenuUser index={index} setIndex={setIndex} avalible={user !== null} />
        </div>
        {
            pages[index]
        }
    </div>
  );
}


