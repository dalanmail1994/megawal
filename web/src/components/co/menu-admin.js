"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Ico from "./Ico";
import { menuListAdmin } from "@/lib/general";



export default function MenuAdmin({ }) {
    const pathname = usePathname();

    // useEffect(() => {
    //     console.log(pathname)
    // }, [pathname])

    var navs = menuListAdmin.map((nav) => ({
        name: nav.name,
        icon: <Ico path={nav.icon} />,
        link:  nav.link
    }))

    return (
        <div className="h-[64px] bg-white/30 backdrop-blur-sm px-[24px] hidden xl:flex flex-row items-center justify-center border-b border-dotted">
            <div className="space-x-3 flex flex-row">
                {
                    navs.map((nav, n) => (
                        <Link key={n} href={nav?.link} className={`${nav.link === pathname ? 'bg-blue-50 text-blue-600' : 'text-gray-500'} hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors duration-200 ${nav?.space ? nav.space : 'space-x-2'} py-1 px-2 rounded-md flex flex-row items-center`}>
                            {nav.icon}
                            <span className="font-semibold text-[15px]">{nav.name}</span>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}


