import { getRequest, putRequest } from "@/lib/api";
import MenuUser from "@/components/co/menu-user";
import { Button } from "@/components/ui/button";
import Container from "@/components/co/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { formDataToObject } from "@/lib/utils";
import { toast } from "sonner"
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils"
import CountrySelect from "../ui/selectCountry";


export default function ProfilePage ({user, setUser}) {
    const [loading, setLoading] = useState(false)
    const [loadingPass, setLoadingPass] = useState(false)
    const [loadingBan, setLoadingBan] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState('')

    useEffect(() => {
        setSelectedCountry(user?.iso)
    }, [user?.iso])

    const allows =  [
        {name: 'is_send_crypto', title: 'Allow Send Crypto'},
        {name: 'is_swap_crypto', title: 'Allow Swap Crypto'},
        {name: 'is_buy_crypto', title: 'Allow Buy Crypto'},
        {name: 'is_sell_crypto', title: 'Allow Sell Crypto'},
        {name: 'is_stake_crypto', title: 'Allow Stake Crypto'},
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
        const fieldNames = [...formData.keys(), ...allowsString, 'main_coin', 'permissions', 'iso'];
        updateUser({...obj, 'iso': selectedCountry}, setLoading, fieldNames)
    }

    const handlePassword = (e) => {
        e.preventDefault();
        setLoadingPass(true);
        const formData = new FormData(e.target);
        var obj = formDataToObject(formData);

        const func0 = (bool) => {
            setLoadingPass(bool)
            e.target.reset();
        }

        updateUser(obj, func0)
    }


    const handleBan = () => {
        setLoadingBan(true)
        const obj = {
            "is_ban": !user?.is_ban
        }
        updateUser(obj, setLoadingBan, ['is_ban'])
    }


    const updateUser = async (obj, stopLoading, names) => {
        try {
            const res = await putRequest(`/users/${user?.id}`, obj);
            if (names) {
                console.log(names)
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




    const normalDate = (date, withTime = false) => {
        if (!user) return null;
        if (!date) return 'N/A';
        const options = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        };
        if (withTime) {
            options.hour = '2-digit';
            options.minute = '2-digit';
        }
        return new Date(date).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="flex flex-col space-y-4">
            {/* <div className="p-3 bg-[#cafdf5] rounded-md flex flex-row items-center space-x-3">
                <svg className="text-sm w-[30px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path fill="#00b8d9" fillRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-10 5.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75M12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2" clipRule="evenodd"></path></svg>
                <p className="text-sm font-medium text-[#003768]">
                    Owned By mark@admin.com
                </p>
            </div> */}
            <div className="flex flex-row justify-end">

                <Button 
                    onClick={handleBan} 
                    className={`${user?.is_ban ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-red-800' : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:bg-orange-800'} cursor-pointer`}
                    disabled={!user || loadingBan}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2m0 2c-1.9 0-3.6.6-4.9 1.7l11.2 11.2c1-1.4 1.7-3.1 1.7-4.9c0-4.4-3.6-8-8-8m4.9 14.3L5.7 7.1C4.6 8.4 4 10.1 4 12c0 4.4 3.6 8 8 8c1.9 0 3.6-.6 4.9-1.7"></path></svg>
                    <span className="font-semibold">
                        {user?.is_ban ? 'User Is Ban' : 'Ban User'}
                    </span>
                </Button>

            </div>
            <div className="flex flex-col space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
                <div className="flex flex-col space-y-6">
                    {/* <Container>
                        <div className="flex flex-row justify-between">
                            <Stat name="KYC Status" value="Pending" />
                            <div className="border-l border-gray-200">
                                
                            </div>
                            <Stat name="2FA Enabled" value="Disabled" />
                        </div>
                    </Container> */}
                    <Container>
                        <div className="flex flex-col font-semibold">
                            <h2 className="text-lg text-gray-500">Total Balance</h2>
                            {
                                user ? (
                                    <span className="text-[26px] font-bold">{user?.main_coin?.symbole}{user?.balance}</span>
                                ) : (
                                    <Skeleton className="h-[39px] w-full" />
                                )
                            }
                        </div>
                    </Container>
                    <Container>
                        <div className="flex flex-col space-y-4">
                            <h2 className="font-semibold text-[18px]">About</h2>
                            <div className="flex flex-col space-y-3">
                                <Line
                                    icon={<svg className="w-7 h-7 text-gray-700" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" viewBox="0 0 24 24"><path fill="currentColor" d="M15 14c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4m-9-4V7H4v3H1v2h3v3h2v-3h3v-2m6 2a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4a4 4 0 0 0 4 4"></path></svg>} 
                                    name="Registered" text={normalDate(user?.created_at)}
                                />
                                <Line
                                    icon={<svg className="w-7 h-7 text-gray-700" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" viewBox="0 0 24 24"><path fill="currentColor" d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8z"></path></svg>}
                                    name="Last Login" text={normalDate(user?.last_login, true)}
                                />
                                <Line 
                                    icon={
                                        <div className="w-7 h-7 flex items-center justify-center">
                                            <FaPlay className="text-gray-700" />
                                        </div>
                                    }
                                    name="Last Action" text={normalDate(user?.last_action, true)}
                                />
                                <Line
                                    icon={<svg className="w-7 h-7 text-gray-700" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" viewBox="0 0 24 24"><g fill="currentColor"><path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.3 2.3 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004s.152-.691.546-1.004m2.286 6.916v-2.824c.347.085.664.228.921.421c.427.32.579.686.579.991s-.152.671-.579.991a2.5 2.5 0 0 1-.921.42"></path><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75S17.385 2.25 12 2.25M12.75 6a.75.75 0 0 0-1.5 0v.816a3.84 3.84 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178c0 .829.4 1.612 1.113 2.178c.502.4 1.102.647 1.719.756v2.978a2.5 2.5 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.1 4.1 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191s-.434-1.632-1.179-2.191a4.1 4.1 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.84 3.84 0 0 0-1.719-.755z" clipRule="evenodd"></path></g></svg>}
                                    name="Currency" text={user?.main_coin?.title}
                                />
                                <Line
                                    icon={<svg className="w-7 h-7 text-gray-700" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M12 2a9 9 0 0 1 9 9c0 3.074-1.676 5.59-3.442 7.395a20.4 20.4 0 0 1-2.876 2.416l-.426.29l-.2.133l-.377.24l-.336.205l-.416.242a1.87 1.87 0 0 1-1.854 0l-.416-.242l-.52-.32l-.192-.125l-.41-.273a20.6 20.6 0 0 1-3.093-2.566C4.676 16.589 3 14.074 3 11a9 9 0 0 1 9-9m0 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6"></path></g></svg>}
                                    name="IP Address" text={user ? (user?.last_ip || 'N/A') : ''}
                                />
                            </div>
                        </div>
                    </Container>
                    <Container>
                        <form className="flex flex-col space-y-5" onSubmit={handlePassword} autoComplete="off">
                            <h2 className="font-semibold text-[18px]">Reset Password</h2>
                            <div className="flex flex-col space-y-3">
                                {
                                    user ? (
                                        <Input placeholder="New Password" name='password' disabled={!user || loadingPass} required={true} />
                                    ) : (
                                        <Skeleton className="h-[36px] w-full" />
                                    )
                                }
                                <Button type="submit" disabled={!user | loadingPass}>Reset Password</Button>
                            </div>
                        </form>
                    </Container>
                    {/* <Container>
                        <div className="flex flex-col space-y-5">
                            <h2 className="font-semibold text-[18px]">Reset Two Factor</h2>
                            <div className="flex flex-col space-y-3">
                                
                                <div className="p-3 bg-[#fff5cc] rounded-md flex flex-row items-center space-x-3">
                                    <svg className="text-sm w-[30px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path fill="#ffab00" fillRule="evenodd" d="M5.312 10.762C8.23 5.587 9.689 3 12 3c2.31 0 3.77 2.587 6.688 7.762l.364.644c2.425 4.3 3.638 6.45 2.542 8.022S17.786 21 12.364 21h-.728c-5.422 0-8.134 0-9.23-1.572s.117-3.722 2.542-8.022zM12 7.25a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2" clipRule="evenodd"></path></svg>
                                    <p className="text-sm font-medium text-[#7f4808]">
                                        Two Factor is Disabled
                                    </p>
                                </div>


                                <Button disabled={true}>Reset Two Factor</Button>
                            </div>
                        </div>
                    </Container> */}
                </div>
                <div className="col-span-2 flex flex-col space-y-6">
                    <Container>
                        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <Inp user={user} loading={loading} title="First Name" name="first_name" requierd={'true'} />
                                <Inp user={user} loading={loading} title="Last Name" name="last_name" requierd={'true'} />
                                <Inp user={user} loading={loading} title="Email Address" name="email" requierd={'true'} />
                                <Inp user={user} loading={loading} title="Address" name="address" />
                                {/* <Inp user={user} loading={loading} title="Country" name="country" /> */}

                                <div className="flex flex-col space-y-0.5">
                                    <span className="text-sm font-medium text-gray-700">Country</span>
                                    {
                                        user ? (
                                            <CountrySelect selectedCountry={selectedCountry || user?.iso} setSelectedCountry={setSelectedCountry} />
                                        ) : (
                                            <Skeleton className="h-[36px] w-full" />
                                        )
                                    }
                                </div>


                                <Inp user={user} loading={loading} title="City" name="city" />
                                <Inp user={user} loading={loading} title="Postal Code" name="postal_code" />
                                <Inp user={user} loading={loading} title="Date Of Birth" name="birthday" />



                                <Sel user={user} loading={loading} title="User Type" name="user_type_id" 
                                    opts={[
                                        {value: '1', title: 'Admin'},
                                        {value: '2', title: 'manager'},
                                        {value: '3', title: 'Client'},
                                    ]}
                                />


                                <Sel user={user} loading={loading} title="Main Coin" name="main_coin_id" 
                                    opts={[
                                        {value: '1', title: 'USD'},
                                        {value: '2', title: 'EUR'},
                                    ]}
                                />

                                <TextAr user={user} loading={loading} title="Dashboard Note" name="dash_note" />
                            </div>
                            <hr className="border-gray-100"></hr>
                            <div className="flex flex-col space-y-2 font-medium text-gray-600">
                                {
                                    allows.map((allow, a) => (
                                        <Allow key={a} user={user} title={allow.title} name={allow.name} loading={loading} />
                                    ))
                                }
                            </div>
                            <div className="flex flex-row justify-end">
                                <Button disabled={!user || loading}>
                                    <span className="font-extrabold">Save Changes</span>
                                </Button>
                            </div>
                        </form>
                    </Container>
                </div>
            </div>
        </div>
    )
}


const Stat = ({ name, value }) => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
            <span className="text-sm text-gray-600 font-medium">{name}</span>
        </div>
    )
}

const Line = ({icon, name, text}) => {

    return (
        <div className="flex flex-row items-center space-x-3">
            {icon}
            <div className="flex flex-row space-x-2 items-center w-full">
                <span className="text-[16px] text-gray-700 font-medium">{name}</span>
                
                {
                    !text ? ( 
                        <Skeleton className="h-[21px] flex-grow" />
                    ) : (
                        <span className="text-gray-950 text-[14px] font-semibold">
                            {text}           
                        </span>
                    )
                }
            </div>
        </div>
    )
}

const Inp = ({user, title, name, loading, requierd='false'}) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        if (user) {
            setValue(user?.[name] || '')
        }
    }, [user])


    return (
        <div className="flex flex-col space-y-0.5">
            <span className="text-sm font-medium text-gray-700">{title}</span>
            {
                user ? (
                    <Input name={name} value={value} onChange={(e) => setValue(e.target.value)} disabled={loading} requierd={requierd} />
                ) : (
                    <Skeleton className="h-[36px] w-full" />
                )
            }
        </div>
    )
}

const TextAr = ({user, title, name, loading}) => {
    return (
        <div className="flex flex-col space-y-0.5 col-span-2">
            <span className="text-sm font-medium text-gray-700">{title}</span>
            {
                user ? (
                    <Textarea name={name} className="h-[100px]" disabled={loading} />
                ) : (
                    <Skeleton className="h-[100px] w-full" />
                )
            }
        </div>
    )
}

const Sel = ({user, title, name, loading, opts}) => {
    const [value, setValue] = useState(4);

    useEffect(() => {
        if (user) {
            setValue(user?.[name])
        }
    }, [user])
    

    return (
        <div className="flex flex-col space-y-0.5">
            <span className="text-sm font-medium text-gray-700">{title}</span>
            {
                user ? (
                    <select name={name} value={value} onChange={(e) => setValue(e.target.value)} disabled={loading}
                        className={cn(
                            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                        )}
                    >
                        {
                            opts?.map((opt, o) => (
                                <option key={o} value={opt.value}>{opt.title}</option>
                            ))
                        }
                    </select>
                ) : (
                    <Skeleton className="h-[36px] w-full" />
                )
            }
        </div>
    )
}


const Allow = ({ user, title, name, loading }) => {
  const [value, setValue] = useState(false);

    useEffect(() => {
        if (user) {
            setValue(user?.permissions?.[name])
        }
    }, [user])

  return (
    <div className="flex flex-row items-center space-x-[20px]">
      <Switch
        id={name}
        name={name}
        checked={value}
        onCheckedChange={(checked) => setValue(checked)}
        className="data-[state=checked]:bg-[#0c68e9] cursor-pointer"
        disabled={!user | loading}
      />
      <Label htmlFor={name}>{title}</Label>
    </div>
  );
};