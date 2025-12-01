'use client'

import { useEffect, useState } from "react"
import Ico from "../co/Ico"
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownLeft } from "react-icons/go";
import { format } from "date-fns";




const DescTd = ({ data, param }) => {
    useEffect(() => {
        console.log(data)
    }, [])
    return (
        <div className={`flex flex-row font-medium text-[15px] items-center space-x-4 px-4 py-2`}>
            <div className="bg-gray-100 w-[48px] h-[48px] rounded-full flex items-center justify-center relative">
                <Ico path={data.currency.logo} className="text-gray-600" width="24px" height="24px"  />
                <div className={`${data?.mod ? 'bg-green-500' : 'bg-red-500'} rounded-full w-[16px] h-[16px] flex items-center justify-center absolute bottom-0 right-0`}>
                    {
                        data?.mod 
                        ? <GoArrowDownLeft className="text-white text-[14px]" />
                        : <GoArrowUpRight className="text-white text-[14px]" />
                    }
                </div>
            </div>
            <div className="flex-grow">
                <div className="flex-col">
                <h2>{data.currency.name} {data?.mod ? 'Received' : 'Sent'}</h2>
                {/* <span className="text-sm text-gray-400">To {data.transaction_hash}</span> */}
                <span className="text-sm text-gray-400">
                    {data?.mod ? 'From' : 'To'} {data?.mod ? data?.from_public_address : data?.to_public_address}
                </span>
                </div>
            </div>
        </div>
    );
};


const AmountTd = ({ data, param }) => {
    return (
        <div className="flex flex-col space-y-1">
            <span className="text-gray-800 font-medium">{data[param]} {data['currency']['iso']}</span>
            {/* <span className="text-[13px] text-gray-700">{}</span> */}
        </div>
    );
};


const DateTd = ({ data, param }) => {
    const formattedDate = format(new Date(data[param]), "dd MMM yyyy");
    const formattedHour = format(new Date(data[param]), "hh:mm a");

    return (
        <div className="flex flex-col space-y-1">
            <span className="text-gray-800 font-medium">{formattedDate}</span>
            <span className="text-[13px] text-gray-700">{formattedHour}</span>
        </div>
    );
};


const StatusTd = ({data, param}) => {

    const colors = {
        pending: {
            bg: 'bg-[#fff1d6]',
            text: 'text-[#b76e00]'
        },
        completed: {
            bg: 'bg-green-200',
            text: 'text-green-600'
        },
        failed: {
            bg: 'bg-red-200',
            text: 'text-red-600'
        },
    }


    return (
        <div className={`${colors[data[param]].bg} text-xs font-medium w-min py-1 px-2 rounded-md`}>
            <span className={`${colors[data[param]].text}`}>{data[param]}</span>
        </div>
    )
}

const UserTd = ({data, param}) => {
    return (
        <div className="flex flex-col space-y-1">
            <span className="text-gray-800 font-medium">ID: {data[param].id}</span>
            <span className="text-gray-800 font-medium">{data[param].email}</span>
            <span className="text-[13px] text-gray-500">{data[param].first_name} {data[param].last_name}</span>
        </div>
    )
}


export {DescTd, AmountTd, DateTd, StatusTd, UserTd}