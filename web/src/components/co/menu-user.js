"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Ico from "./Ico";
import { useUser } from "@/context/UserContext";


export default function MenuUser({ index, setIndex, avalible }) {
    const pathname = usePathname();
    const { user } = useUser();


    var navs = [
        {
            name: 'Profile',
            icon: <Ico path="/flags/ic-analytics.svg" />,
        },
        {
            name: 'Wallets',
            icon: <Ico path="/flags/ic-banking.svg" />,
        },
        {
            name: 'Transactions',
            icon: <Ico path="/flags/ic-money.svg" />,
        },
        {
            name: 'Support Tickets',
            icon: <Ico path="/flags/ic-swap.svg" />,
        },
        {
            name: 'KYC Verifications',
            icon: <Ico path="/flags/ic-support.svg" />,
        },
        {
            name: 'Peyments Methods',
            icon: <Ico path="/flags/ic-support.svg" />,
        },
        // {
        //     name: 'Stakes',
        //     icon: <Ico path="/flags/ic-support.svg" />,
        // },
        {
            name: 'Logs',
            icon: <Ico path="/flags/ic-logs.svg" />,
        },
    ]



    return (
        <div className="h-[64px] flex flex-row items-center justify-center">
            <div className="space-x-4 flex flex-row">
                {
                    navs.map((nav, n) => (
                        // transition-colors duration-200
                        <div key={n} onClick={avalible ? () => setIndex(n) : () => {}} className={`text-gray-600 border-b-[2.5px] ${index == n ? "border-gray-600" : "border-white"}  hover:text-gray-700 cursor-pointer  py-1 px-2 space-x-2 flex flex-row items-center`}>
                            {nav.icon}
                            <span className="font-semibold text-[15px]">{nav.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}


