"use client"

import Header from "@/components/co/header";
import Menu from "@/components/co/menu";


export default function RootLayout({ children }) {
  
  return (
    <div className="flex flex-col">
      <div className="flex flex-col sticky top-0 z-10">
        <Header />
        <Menu />
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-[1536px] p-[24px] lg:p-[40px]">
          {children}
        </div>
      </div>
    </div>
  );
}


