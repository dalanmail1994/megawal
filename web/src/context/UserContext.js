// context/UserContext.tsx
"use client";

import { getRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleAuth = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push('/login')
    } 
    else {
        try {
            const res = await getRequest("/user");
            console.log(res)
            setUser(res);
        } catch (err) {
            console.log('err !!!!!!!!!!!')
            console.log(err)
            if (err?.message !== 'Request aborted'){
              localStorage.removeItem("authToken");
              router.push('/login')
            }
        } finally {
            
        }
    }
  }
    

  useEffect(() => {
    handleAuth();
  }, []);

  if (user) return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
