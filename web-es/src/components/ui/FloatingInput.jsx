import { Input } from "./input";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export function FloatingInput({ label, className, id, ...props }) {
  const inputId = id || `floating-${props.name}`;
  const [val, setVal] = useState('')

    useEffect(() => {
        console.log(props.name)
    })

  return (
    <div className="relative w-full">
      <Input
        id={inputId}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className={cn(
          "peer bg-transparent", // top padding for label
          className
        )}
        {...props}
      />
      <label
        htmlFor={inputId}
        className={`text-sm absolute left-3 top-2 z-10 text-gray-600 font-medium transition-all rounded-md px-1
            ${val == '' 
                ? 'peer-focus:text-xs peer-focus:text-gray-600 peer-focus:top-[-10px] peer-focus:left-1 peer-focus:bg-white' 
                : 'text-xs text-gray-600 top-[-10px] left-1 bg-white'}
            `}
      >
        {label}
      </label>
    </div>
  );
}

// 

// pointer-events-none

// origin-[0] scale-100 transform text-muted-foreground 
// peer-placeholder-shown:top-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base
// peer-focus:top-2 peer-focus:scale-100 peer-focus:text-sm