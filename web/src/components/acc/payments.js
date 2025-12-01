"use client"


import Container from "../co/container";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { motion } from "motion/react"
import { Label } from "@radix-ui/react-label";
import { FiLock } from "react-icons/fi";
import { formDataToObject } from "@/lib/utils";
import { deleteRequest, getRequest, postRequest } from "@/lib/api";
import { toast } from "sonner"
import { PiBankFill } from "react-icons/pi";
import { CiCreditCard1 } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoEyeSharp } from "react-icons/io5";

import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function PaymentsAcc({userId}) {
    const [open, setOpen] = useState(false);
    const [mod, setMood] = useState(false)
    const [loading, setLoading] = useState(false)
    const [payments, setPayments] = useState()

    const getData = async () => {
        try {
            setPayments()
            // const res = await getRequest(`/payment-methods/${userId}`);
            const res = await getRequest(`/payment-methods${userId ? `/${userId}` : ''}`);
            setPayments(res.data)
        } catch (err) {
            console.error(err.response)
        } finally {
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        console.log(payments)
    }, [payments])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const obj = formDataToObject(formData);
        try {
            const res = await postRequest("/payment-methods", {
                ...obj,
                type: mod ? 'bank' : 'card'
            });
            getData()
            toast.success(res.message)
            setOpen(false);
        } catch (err) {
            toast.error(err.response.data.message)
        } finally {
            setLoading(false);
        }
    }





    

    
  return (
    <Container>
        <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center justify-between">
                {
                    !userId && (
                        <h2 className="font-semibold text-[17px]">Payment Methods</h2>
                    )
                }
                {
                    !userId && (
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button variant={"link"} className="text-blue-600 hover:text-blue-700 active:text-blue-700">+ New Payment Methods</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>New Payment Method</DialogTitle>
                                </DialogHeader>

                                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                                    <div className="space-y-4 flex flex-col">
                                        <CardSwap
                                            mod={mod} setMood={setMood}
                                            titleA="Credit Card"
                                            titleB="Bank Account"
                                            A={
                                                <div className="py-4 flex flex-col space-y-3">
                                                    <Inp name="card_number" title="Card Number"  placeholder="XXXX XXXX XXXX XXXX" />
                                                    <Inp name="card_name" title="Card Holder"  placeholder="JOHN DOE" />
                                                    <div className="flex flex-row items-center space-x-4 [&>div]:w-1/2">
                                                        <Inp name="expiration_date" title="Expiration Date"  placeholder="MM/YY" />
                                                        <Inp name="cvv" title="CVV/CVC"  placeholder="***" />
                                                    </div>
                                                </div>
                                            }
                                            B={
                                                <div className="py-4 flex flex-col space-y-3">
                                                    <Inp name="account_number" title="Account Number"  placeholder="" />
                                                    <Inp name="name" title="Bank Name"  placeholder="" />
                                                </div>
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-row items-center space-x-2">
                                        <FiLock className="text-gray-600" />
                                        <span className="text-gray-500 font-medium text-[13px]">Your transaction is secured with SSL encryption</span>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="button" variant="outline" disabled={loading}>
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button type="submit" disabled={loading}>Add</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )
                }
            </div>



            <div className="grid grid-cols-2 gap-4">
                {
                    userId && payments?.length == 0 && (
                        <div className="text-[16px] font-medium text-gray-700">
                            <span>No payment Methods</span>
                        </div>
                    )
                }
                {
                    !payments && (
                        <Container className="relative">
                            <div className="w-[22px] h-[22px] flex items-center justify-center rounded-full absolute top-3 right-2">
                                <HiOutlineDotsVertical className=" text-gray-500" />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Skeleton className="h-[36px] w-[36px] rounded-full" />
                                <div className="flex flex-col space-y-[2px]">
                                    <Skeleton className="h-[27px] w-[150px]" />
                                    <Skeleton className="h-[20px] w-[250px]" />
                                </div>
                            </div>
                        </Container>
                    )
                }
                {
                    payments?.map((pay, p) => (
                        <CardPay key={p} pay={pay} getData={getData} userId={userId} />
                    ))
                }
            </div>
        </div>
    </Container>
  );
}


const CardPay = ({pay, getData, userId}) => {

    function formatCreatedAt(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' }); // eg. "Jul"
        const year = date.getFullYear();
        return `Added at ${day} ${month} ${year}`;
    }

    const deleteMethod = async () => {
        try {
            const res = await deleteRequest(`/payment-methods/${pay.id}`);
            toast.success(res.message)
        } catch (err) {
            // toast.error(err.response.data.message)
            console.error(err.response)
        } finally {
            getData()
        }
    }

    return (
        <Container className="relative">
            {
                userId ? (
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="w-[22px] h-[22px] flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200 absolute top-3 right-2">
                                    <IoEyeSharp className="text-gray-500" />
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Method Information</DialogTitle>
                                </DialogHeader>
                                {
                                    pay.type == 'card' ? (
                                        <div className="flex flex-col">
                                            <Line title="Card Number:" value={pay.card_number} />
                                            <Line title="Card Name:" value={pay.card_name} />
                                            <Line title="Expiration Date:" value={pay.expiration_date} />
                                            <Line title="CVV:" value={pay.cvv} />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col">
                                            <Line title="Bank Name:" value={pay.name} />
                                            <Line title="Account Number:" value={pay.account_number} />
                                        </div>
                                    )
                                }
                            </DialogContent>
                        </Dialog>
                ) : (
                    <DropdownMenu>
                        <div className="w-[22px] h-[22px] flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200 absolute top-3 right-2">
                            <DropdownMenuTrigger>
                                <HiOutlineDotsVertical className="text-gray-500" />
                            </DropdownMenuTrigger>
                        </div>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Button onClick={deleteMethod} variant="ghost" className="w-full flex justify-start hover:text-red-600">
                                    <span className="font-medium">Delete</span>
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }


            

            <div className="flex flex-col space-y-2">
                {
                    pay.type === 'card' ? (
                        <CiCreditCard1 className="text-[36px]" />
                    ) : (
                        <PiBankFill className="text-[36px]" />
                    )
                }
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold">
                        {
                            pay.type == 'card' ? (
                                `VISA *${pay?.card_number}`
                            ) : (
                                pay?.name
                            )
                        }
                    </h2>
                    <span className="font-medium text-gray-700 text-[14px]">
                            {formatCreatedAt(pay.created_at)}
                    </span>
                </div>
            </div>
        </Container>
    )
}

const Line = ({title, value}) => {
    return (
        <div className="flex flex-row items-center space-x-2">
            <span className="font-semibold text-gray-900">{title}</span>
            <span className="font-medium text-gray-700">{value}</span>
        </div>
    )
}

const Inp = ({title, name, placeholder}) => {

    return (
        <div className="space-y-2">
            <Label htmlFor="card_number" className="text-[13px] font-semibold text-gray-700">{title}</Label>
            <Input className="h-[44px]" id="card_number" type="text" name={name} placeholder={placeholder} required={true} />
        </div>
    )
}




function CardSwap({titleA, titleB, A, B, mod, setMood}) {

    return (
        <div className="flex flex-col">
          <div className="flex flex-row justify-between [&>div]:flex [&>div]:cursor-pointer font-semibold text-[16px] [&>div]:justify-center [&>div]:py-4 [&>div]:w-1/2">
            <div onClick={() => setMood(false)}>
              <span>{titleA}</span>
            </div>
            <div onClick={() => setMood(true)}>
              <span>{titleB}</span>
            </div>
          </div>

          <div className="w-full bg-gray-100">
            <motion.div animate={{
              x: mod ? "100%" : "0%"
            }}
              className="w-1/2 border-t-2 border-gray-800">
            </motion.div>
          </div>
          
          {
            !mod ? (
              A
            ) : (
              B
            )
          }
        </div>
  );
}