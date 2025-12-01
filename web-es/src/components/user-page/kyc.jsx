'use client'

import Container from "../co/container"
import { useEffect, useState } from "react"
import { getRequest, putRequest } from "@/lib/api"
import TableMain from "../co/table-main"
import { DateTd, StatusTd } from "./transactions-table-element"
import { IoEyeSharp } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"
import { formDataToObject } from "@/lib/utils"
import { toast } from "sonner"



export default function KycPage ({userId}) {
    const [data, setData] = useState()

    const getKycs = async () => {
        setData()
        
        try {
            const res = await getRequest(`/kyc/user/${userId}`);
            setData(res?.documents)
        } catch (err) {
            console.log(err.response)
            // toast.error(err.response.data.message)
        } finally {

        }
    }

    useEffect(() => {
        getKycs()
    }, [])




    return (
        <div className="flex flex-col space-y-5">
            <div className="flex flex-row items-center justify-between">
                <h2 className="text-2xl font-bold">KYC Verifications</h2>
            </div>

            <Container p="p-0">
                <TableMain
                    headData={[
                        {key: 'document_type', title: 'Descreption', Element: DescreptionTd},
                        {key: 'created_at', title: 'Date', Element: DateTd},
                        {key: 'status', title: 'Status', Element: StatusTd},
                        {key: 'base64', title: 'Action', Element: ActionTd},
                    ]}
                    data={data}
                    funcRefresh={getKycs}
                />
            </Container>
        </div>
    )
}



const ActionTd = ({ data, param, funcRefresh }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState()



    const updateStatus = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        var obj = formDataToObject(formData);
        try {
            const res = await putRequest(`/kyc/${data['id']}/status`, obj);
            toast.success(res.message)
            funcRefresh();
            setOpen(false);
        } catch (err) {
            toast.error(err.response.data.message)
        } finally {
            setLoading(false);
        }
    }





    
    return (
        <div className="">
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger>
                    <IoEyeSharp className="text-gray-500 hover:text-gray-600 cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle></AlertDialogTitle>
                        <AlertDialogDescription className="flex items-center justify-center">
                            <img src={data['base64']} />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <div className="flex flex-row items-center justify-between w-full">
                            <AlertDialogCancel onClick={() => setOpen(false)}>
                                <span className="">Cancel</span>
                            </AlertDialogCancel>
                            <form className="flex flex-row space-x-2" onSubmit={updateStatus}>
                                <select className="sel" defaultValue={data['status']} name="status" disabled={loading}>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="failed">Failed</option>
                                </select>
                                <Button type="submit" disabled={loading}>
                                    <span className="font-semibold">Update Status</span>
                                </Button>
                            </form>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};




const DescreptionTd = ({ data, param }) => {

    return (
        <div className="font-semibold">
            {data[param]}
        </div>
    );
};




