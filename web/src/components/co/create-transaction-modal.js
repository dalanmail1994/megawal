// components/MyModal.tsx
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
import CardSwapDepoWith from "./card-swap-depo-with";
import { useInfo } from "@/context/InfoContext";
import { FloatingInput } from "../ui/FloatingInput";
import { useParams } from "next/navigation";
import { toast } from "sonner"


export function CreateTransactionModal({ getTransactions }) {
    const { currencies } = useInfo()
    const [open, setOpen] = useState(false);
    const [mod, setMood] = useState(true)
    const [loading, setLoading] = useState(false)
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        var obj = formDataToObject(formData);

        try {
            const res = await postRequest("/transactions", {
                ...obj,
                mod: mod,
                user_id: id
            });
            toast.success(res.message)
            getTransactions();
            setOpen(false);
        } catch (err) {
            toast.error(err.response.data.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setMood(true)
    }, [open])


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" type="button">
                    <span className="font-semibold text-[13px]">Add Transaction</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="px-0">
                <DialogHeader className="px-6">
                    <DialogTitle>Add Transaction</DialogTitle>
                </DialogHeader>



                <CardSwapDepoWith mod={mod} setMood={setMood} />


                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 px-6">
                    <div className="p-3 bg-[#cafdf5] rounded-md flex flex-row items-center space-x-2">
                        <svg className="text-sm w-[22px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path fill="#00b8d9" fillRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-10 5.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75M12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2" clipRule="evenodd"></path></svg>
                        <p className="text-sm font-medium text-[#003768]">
                            {
                                mod ? "You are depositing to user wallet." : "You are withdrawing from user wallet."
                            }
                        </p>
                    </div>
                    <div className="space-y-4 flex flex-col">

                        
                        <select className="sel" defaultValue="BTC" name="currency_iso">

                            {
                                currencies.map((currency, c) => (
                                    <option key={c} value={currency.iso}>{currency.name}</option>
                                ))
                            }
                        </select>


                        <Input type="text" name="amount" placeholder="Transaction Amount" required={true} />
                        <Input type="datetime-local" name="date" placeholder="Sent At" required={true}   defaultValue={new Date().toISOString().slice(0, 16)} />

                        <select className="sel" defaultValue="pending" name="status">
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                        </select>

                        <Input type="text" name="transaction_hash" placeholder="Transaction Hash" required={true} />
                        <Input type="text" name={mod ? "from_public_address" : "to_public_address"} placeholder={mod ? "From Address" : "To Address"} required={true} />

                        <Textarea className="h-[120px]" name="descreption" placeholder="Note" required={true} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={loading}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={loading}>Create Transaction</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
