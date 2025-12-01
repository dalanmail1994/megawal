"use client"

import { InfoProvider } from "@/context/InfoContext";
import { UserProvider } from "@/context/UserContext";

export default function RootLayout({ children }) {


   return (
      <UserProvider>
         <InfoProvider>
            {children}
         </InfoProvider>
      </UserProvider>
   );
}


