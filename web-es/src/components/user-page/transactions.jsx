'use client'

import Container from "../co/container"
import { CreateTransactionModal } from "../co/create-transaction-modal"
import { useEffect, useState } from "react"
import { getRequest } from "@/lib/api"
import TableMain from "../co/table-main"
import { format } from "date-fns";
import Ico from "../co/Ico"
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownLeft } from "react-icons/go";
import { SeeTransactionModal } from "../co/see-transaction-modal"
import { AmountTd, DateTd, DescTd, StatusTd, UserTd } from "./transactions-table-element"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";



export default function TransactionsPage ({userId, all}) {
    const [data, setData] = useState()
    const [tran, setTran] = useState()
    const [meta, setMeta] = useState({
        current_page: 1,
        last_page: 1,
    })

    const getTransactions = async (page) => {
        setData()
        
        try {
            const res = await getRequest("/transactions", {'user_id': userId, 'all': all, 'page': page});
            setData(res.data);
            setMeta(prev => ({
                ...prev,
                last_page: res.last_page,
                current_page: res.current_page
            }))
        } catch (err) {
            console.log(err.response)
            // toast.error(err.response.data.message)
        } finally {

        }
    }

    useEffect(() => {
        getTransactions(meta.current_page);
    }, [meta.current_page]);
    


    // useEffect(() => {
    //     console.log(tran)
    // }, [tran])


    useEffect(() => {
        if (data && tran) {
            if (typeof data == typeof {} && typeof tran == typeof {} ) {
                var new_tran = data.find(obj => obj.id == tran.id)
                setTran(new_tran)
            }
        }
    }, [data])



    const nextPage = (page) => {
        if (data !== null) {
            setMeta(prev => ({...prev, current_page: page}))
        }
    };

    return (
        <div className="flex flex-col space-y-5">
            <SeeTransactionModal tran={tran} setTran={setTran} getTransactions={getTransactions} />
            {
                !all && (
                    <div className="flex flex-row items-center justify-between">
                        <h2 className="text-2xl font-bold">Transactions</h2>
                        <CreateTransactionModal getTransactions={getTransactions} />
                    </div>
                )
            }
            <Container p="p-0">
                <TableMain
                    headData={[
                        {key: 'Desc', title: 'Descreption', Element: DescTd},
                        {key: 'user', title: 'User', Element: UserTd},
                        // {key: 'created_by', title: 'Created By'},
                        // {key: 'descreption', title: 'Description'},
                        {key: 'date', title: 'Date', Element: DateTd},
                        {key: 'amount', title: 'Amount', Element: AmountTd},
                        {key: 'status', title: 'Status', Element: StatusTd},
                    ]}
                    data={data}
                    click={setTran}
                />
            </Container>
            <div className="flex justify-end">
                <div className="flex flex-row bg-gray-200 overflow-hidden rounded-lg">
                    <div
                        className={`w-[30px] h-[30px]  text-[15px] ${meta?.current_page > 1 ? 'hover:bg-gray-300 cursor-pointer' : ''} font-medium text-gray-700 flex items-center justify-center`}
                        onClick={ meta?.current_page > 1 ? () => nextPage(meta?.current_page - 1) : null}
                    >
                        <IoIosArrowBack className="text-[12px]" />
                    </div>
                    {
                        Array.from({ length: meta.last_page }, (_, i) => {
                            const page = i + 1;
                            return (
                                <div
                                    key={page}
                                    className={`w-[30px] h-[30px] text-[15px] font-medium flex items-center justify-center ${page === meta?.current_page ? 'bg-blue-500 text-white rounded-lg' : 'text-gray-700 hover:bg-gray-300 cursor-pointer'}`}
                                    onClick={() => nextPage(page)}
                                >
                                    {page}
                                </div>
                            );
                        })
                    }

                    <div
                        className={`w-[30px] h-[30px]  text-[15px] ${meta?.current_page < meta?.last_page ? 'hover:bg-gray-300 cursor-pointer' : ''} font-medium text-gray-700 flex items-center justify-center`}
                        onClick={meta?.current_page < meta?.last_page ? () => nextPage(meta?.current_page + 1) : () => {}}
                    >
                        <IoIosArrowForward className="text-[12px]" />
                    </div>
                </div>
            </div>
        </div>
    )
}











