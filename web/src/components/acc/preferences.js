import Container from "../co/container";
import { Switch } from "@/components/ui/switch"
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { Label } from "@radix-ui/react-label";
import { formDataToObject } from "@/lib/utils";

export default function PreferencesAcc({updateUser}) {
    const [loading, setLoading] = useState(false)


    const allows =  [
        {name: 'email_on_account_change', title: 'Receive an email when there is a change to your account.'},
        {name: 'email_on_kyc_update', title: 'Email me about my KYC status updates.'},
        {name: 'email_on_login_attempt', title: 'Email me about login attempts.'},
        {name: 'email_on_payment_notification', title: 'Email me about payment notifications.'},
        {name: 'email_crypto_news', title: 'Email me crypto news'},
        {name: 'email_on_tx_sent', title: 'Receive an email when transactions is sent.'},
        {name: 'email_on_tx_received', title: 'Receive an email when transactions is received.'},
        {name: 'email_on_stake_rewards', title: 'Receive an email when you receive stake rewards.'},
    ]


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        var obj = formDataToObject(formData);
        for (const allow of allows) {
            if (obj[allow.name] == 'on') {
                obj[allow.name] = true;
            } else {
                obj[allow.name] = false;
            }
        }
        
        const allowsString = allows.map(allow => allow.name)
        const fieldNames = [...allowsString, 'permissions']; //...formData.keys(), 
    
        updateUser(obj, setLoading, fieldNames)
    }
    
    
  return (
    <Container>
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">Account Settings</h2>
                    <span className="text-sm font-medium text-gray-400">You will receive emails in your email address</span>
                </div>
                <div className="bg-gray-100 col-span-2 font-medium rounded-xl p-[24px] flex flex-col space-y-7">
                    {
                        allows.slice(0,4).map((allow, a) => (
                            <Line key={a} title={allow.title} name={allow.name} loading={loading} />  
                        ))
                    }
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">Crypto Settings</h2>
                    <span className="text-sm font-medium text-gray-400">You will receive emails in your email address</span>
                </div>
                <div className="bg-gray-100 col-span-2 font-medium rounded-xl p-[24px] flex flex-col space-y-7">
                    {
                        allows.slice(4,8).map((allow, a) => (
                            <Line key={a} title={allow.title} name={allow.name} loading={loading} />  
                        ))
                    }
                </div>
            </div>
            <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                    <span className="font-bold">Save Changes</span>
                </Button>
            </div>
        </form>
    </Container>
  );
}



const Line = ({title, name, loading}) => {
    const { user } = useUser();
    const [value, setValue] = useState(false);

    useEffect(() => {
        if (user) {
            setValue(user?.permissions?.[name])
        }
    }, [user])

    return (
        <div className="flex items-center justify-between">
            <Label className="text-sm text-gray-600" htmlFor={name}>{title}</Label>
            <Switch
                id={name}
                name={name}
                checked={value}
                onCheckedChange={(checked) => setValue(checked)}
                className="data-[state=checked]:bg-[#0c68e9] cursor-pointer"
                disabled={loading}
            />
        </div>

    )
}
