"use client"

import { useState } from "react";
import Ico from "@/components/co/Ico";
import MenuAccount from "@/components/co/menu-account";
import GeneralAcc from "@/components/acc/general";
import PreferencesAcc from "@/components/acc/preferences";
import SecurityAcc from "@/components/acc/security";
import { useUser } from "@/context/UserContext";
import { putRequest } from "@/lib/api";
import { toast } from "sonner"
import VerificationAcc from "@/components/acc/verification";
import PaymentsAcc from "@/components/acc/payments";


export default function Home() {
    const { user, setUser } = useUser();
    const [index, setIndex] = useState(0)

    const updateUser = async (obj, stopLoading, names=[], path) => {
        try {
            const res = await putRequest(`${path || `/users/${user?.id}`}`, obj);
            if (names.length > 0) {
                var newUser = {}
                for (var name of names) {
                    newUser[name] = res.user[name]
                }
                setUser(prev => {
                    return {
                        ...prev,
                        ...newUser
                    }
                })
            }
            toast.success(res.message)
        } catch (err) {
            toast.error(err?.response?.data?.message)
        } finally {
            stopLoading(false);
        }
    }

    var navs = [
        {
            name: 'General',
            icon: <Ico path="/flags/ic-analytics.svg" />,
            content: <GeneralAcc updateUser={updateUser} />
        },
        {
            name: 'Preferences',
            icon: <Ico path="/flags/ic-banking.svg" />,
            content: <PreferencesAcc updateUser={updateUser} />
        },
        {
            name: 'Payment Methods',
            icon: <Ico path="/flags/ic-payment.svg" />,
            content: <PaymentsAcc updateUser={updateUser} />
        },
        {
            name: 'Verification',
            icon: <Ico path="/flags/ic-veri.svg" />,
            content: <VerificationAcc />
        },
        {
            name: 'Security',
            icon: <Ico path="/flags/ic-support.svg" />,
            content: <SecurityAcc updateUser={updateUser} />
        }
    ]


    return (
        <div className="flex flex-col space-y-7">
            <h1 className="font-bold text-2xl">Account Settings</h1>
            <div className="flex flex-col space-y-2">
                <MenuAccount index={index} setIndex={setIndex} navs={navs} />
                <div>
                    {
                        navs[index]?.content
                    }
                </div>
            </div>
        </div>
    );
}