"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function RootLayout({ children }) {
  const router = useRouter();
  
  useEffect(() => {
    var token = localStorage.getItem('authToken')
    if (token) {
      router.push('/')
    }
  }, [])
  
  return (
    <div 
      className="relative min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('/background.webp')" }}
    >
      <div className="absolute inset-0 bg-white/50 z-10" />
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        {children}
      </div>
    </div>
  );
}
