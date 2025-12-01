// context/InfoContext.tsx
"use client";

import { getRequest } from "@/lib/api";
import { createContext, useContext, useState, useEffect } from "react";

export const InfoContext = createContext(null);

export const InfoProvider = ({ children }) => {
  const [currencies, setCurrencies] = useState(null);

  const getCurrencies = async () => {
    try {
        const res = await getRequest("/currencies");
        // console.log("currencies:", res)
        setCurrencies(res)
    } catch (err) {
        setCurrencies([])
    } finally {
        
    }
  }
    

  useEffect(() => {
    getCurrencies();
  }, []);




  if (currencies) return (
    <InfoContext.Provider value={{ currencies, getCurrencies }}>
      {children}
    </InfoContext.Provider>
  );
};

export const useInfo = () => useContext(InfoContext);
