"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MenuAdmin from "@/components/co/menu-admin";
import { useUser } from "@/context/UserContext";
import HeaderAdmin from "@/components/co/header-admin";


export default function RootLayout({ children }) {
  const router = useRouter();
  const { user } = useUser();
  const [ok, setOk] = useState(false);

  // check if admin
  useEffect(() => {
    if (user.user_type_id < 3) {
      setOk(true)
    } else {
      router.push('/')
    }
  }, [])
  
  if (ok) return (
    <div className="flex flex-col">
      <div className="flex flex-col sticky top-0 z-10">
        <HeaderAdmin />
        <MenuAdmin />
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-[1536px] p-[24px] lg:p-[40px]">
          {children}
        </div>
      </div>
    </div>
  );
}


