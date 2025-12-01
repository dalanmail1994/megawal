"use client";

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
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { postRequest } from "@/lib/api";
import { formDataToObject } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BsFillClockFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { EditTransactionModal } from "./edit-transaction-modal";


export function SeeTransactionModal({ tran, setTran, getTransactions }) {
    const [open, setOpen] = useState(false)
    
    useEffect(() => {
        if (tran) {
            setOpen(true)
        }
    }, [tran])


    const handleOpen = (bool) => {
        setOpen(bool)
        if (!bool) {
            setTran(null)
        }
    }


    return (
        <Dialog open={open} onOpenChange={handleOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Transaction Details</DialogTitle>
                </DialogHeader>
                
                <div className="flex flex-col space-y-5 items-center text-center">

                    <div className="p-3 bg-[#cafdf5] rounded-md flex flex-row items-center space-x-3">
                        <svg className="text-sm w-[30px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path fill="#00b8d9" fillRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-10 5.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75M12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2" clipRule="evenodd"></path></svg>
                        <p className="text-sm font-medium text-[#003768]">
                            This transaction was added by {tran?.creator.email}
                        </p>
                    </div>

                    
                    {
                        tran?.status == 'completed'
                        ? <FaCheckCircle className="text-[60px] text-green-500" />
                        : tran?.status == 'failed'
                            ? <IoIosCloseCircle className="!text-[75px] text-red-500" />
                            : <BsFillClockFill className="text-[60px] text-[#ffab00]" />
                    }
                    

                    {/* completed failed pending */}
                    <div className="flex flex-col">
                        <h1 className="text-[24px] font-bold">
                            {
                                tran?.status == 'completed'
                                ? 'Received Successfully'
                                : tran?.status == 'failed'
                                    ? 'Transaction Failed'
                                    : 'Transaction Pending...'
                            }
                        </h1>
                        {
                            tran?.mod
                            ? tran?.from_public_address
                            : tran?.to_public_address
                        }
                        {/* <span className="text-[14px] text-gray-800">To 0x440d9140C967c1b0Cfb17F3a1cD63495d3Fd7d9D</span> */}
                    </div>



                    <div className="flex flex-col">
                        <h1 className="text-[24px] font-extrabold">
                            {tran?.amount} {tran?.currency.iso}
                        </h1>
                        <span className="text-[14px] text-gray-800">≈449402.02377295 USD</span>
                    </div>


                    <div className="p-3 bg-[#fff5cc] rounded-md flex flex-row items-center space-x-3">
                        {/* <svg className="text-sm w-[30px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path fill="#ffab00" fillRule="evenodd" d="M5.312 10.762C8.23 5.587 9.689 3 12 3c2.31 0 3.77 2.587 6.688 7.762l.364.644c2.425 4.3 3.638 6.45 2.542 8.022S17.786 21 12.364 21h-.728c-5.422 0-8.134 0-9.23-1.572s.117-3.722 2.542-8.022zM12 7.25a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2" clipRule="evenodd"></path></svg> */}
                        <p 
                            className="text-sm font-medium text-[#7f4808] text-start"
                            style={{ whiteSpace: 'pre-line' }}
                        >
                            {tran?.descreption}
                        </p>
                    </div>

                    {
                        [
                            {key: 'Transaction Hash', value: tran?.transaction_hash},
                            {key: 'Transaction Date', value: new Date(tran?.date).toLocaleString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col font-medium">
                                <span className="text-sm text-gray-600">{item['key']}</span>
                                <span className="text-md">{item['value']}</span>
                            </div>
                        ))
                    }

                    <EditTransactionModal tran={tran} handleOpen={handleOpen} getTransactions={getTransactions} />
                </div>

            </DialogContent>
        </Dialog>
    );
}
