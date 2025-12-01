

'use client'

import Container from "../co/container"
import { useEffect, useState } from "react"
import { getRequest } from "@/lib/api"
import TableMain from "../co/table-main"
import { DateTd, UserTd } from "./transactions-table-element"



export default function LogsPage ({userId, all}) {
    const [data, setData] = useState()

    const getTransactions = async () => {
        setData()
        
        try {
            const res = await getRequest(`/users/${userId}/logs`);
            setData(res.data)
        } catch (err) {
            console.log(err.response)
            // toast.error(err.response.data.message)
        } finally {

        }
    }

    useEffect(() => {
        getTransactions()
    }, [])




    return (
        <div className="flex flex-col space-y-5">
            <div className="flex flex-row items-center justify-between">
                <h2 className="text-2xl font-bold">Logs</h2>
            </div>
            <Container p="p-0">
                <TableMain
                    headData={[
                        {key: 'title', title: 'Title'},
                        {key: 'method', title: 'Method'},
                        {key: 'path', title: 'Path'},
                        {key: 'created_at', title: 'Date', Element: DateTd},
                        {key: 'payload', title: 'Payload', Element: PayloadTd},
                        {key: 'user', title: 'User', Element: UserTd},
                        {key: 'target_user', title: 'Target User', Element: UserTd},
                    ]}
                    data={data}
                />
            </Container>
        </div>
    )
}





const PayloadTd = ({ data, param }) => {
    let content = data[param];

    // אם זה JSON – נפרמט אותו יפה
    if (typeof content === 'string') {
        try {
            const parsed = JSON.parse(content);
            content = parsed;
        } catch (e) {
            // אם זה לא JSON תקין – נשאיר אותו כרגיל
        }
    }

    return (
        <div className="whitespace-pre-wrap text-xs text-gray-800 font-mono bg-gray-100 p-2 rounded-md">
            {
                typeof content === 'object'
                    ? JSON.stringify(content, null, 2) // format nicely
                    : String(content)
            }
        </div>
    );
};
