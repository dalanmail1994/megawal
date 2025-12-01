
'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Ico from "../co/Ico"
import { Button } from "../ui/button"


export default function TableMain({  headData, data, click, funcRefresh, meta }) {
  return (
        <Table className="p-0">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader className="bg-gray-200" >
                <TableRow>
                    {
                        headData.map((head, h) => (
                            <TableHead key={h}>{head.title}</TableHead>
                        ))
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data?.map((dat, d) => (
                        <TableRow key={d}>
                            {
                                headData.map((head, h) => (
                                    head.Element
                                    ? <TableCell key={h} onClick={() => click ? click(dat) : {}} className={`${click ? 'cursor-pointer' : ''}`}><head.Element data={dat} param={head.key} funcRefresh={funcRefresh} /></TableCell>
                                    : <TableCell key={h} onClick={() => click ? click(dat) : {}} className={`${click ? 'cursor-pointer' : ''}`}>{dat[head.key]}</TableCell>
                                ))
                            }
                        </TableRow>
                    ))
                }
                {
                    data == null && (
                        <TableRow>
                            <TableCell>Loading...</TableCell>
                        </TableRow>
                    )
                }
                {
                    data?.length == 0 && (
                        <TableRow>
                            <TableCell>No result.</TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
  );
}




const Two = ({up, bottom}) => {

    return (
        <div className="flex flex-col space-y-1 font-medium">
            <span>{up}</span>
            <span className="text-xs text-gray-600">{bottom}</span>
        </div>
    )
}