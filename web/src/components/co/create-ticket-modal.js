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


export function CreateTicketModal({ getTickets }) {
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = formDataToObject(formData);
        try {
            const res = await postRequest("/tickets", obj);
            getTickets();
            setOpen(false);
        } catch (err) {
            // setError(err.response.data.message);
        } finally {
            // setLoading(false);
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" type="button">
                    <span className="font-semibold text-[13px]">Create Ticket</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Ticket</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="space-y-4 flex flex-col">
                        <Input type="text" name="subject" placeholder="Title" />
                        <Select defaultValue="0" name="priority">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Low</SelectItem>
                                <SelectItem value="1">Medium</SelectItem>
                                <SelectItem value="2">High</SelectItem>
                            </SelectContent>
                        </Select>

                        <Textarea className="h-[120px]" name="message" placeholder="Message" />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Create Ticket</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
