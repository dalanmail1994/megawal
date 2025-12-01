"use client"

import { useState } from "react";
import Container from "./container";
import { motion } from "motion/react"

export default function CardSwap({titleA, titleB, A, B}) {
    const [mod, setMood] = useState(false)

    return (
      <Container p="p-0">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between bg-gray-100 [&>div]:flex [&>div]:cursor-pointer font-semibold text-[16px] [&>div]:justify-center [&>div]:py-4 [&>div]:w-1/2">
            <div onClick={() => setMood(false)}>
              <span>{titleA}</span>
            </div>
            <div onClick={() => setMood(true)}>
              <span>{titleB}</span>
            </div>
          </div>

          <div className="w-full bg-gray-100">
            <motion.div animate={{
              x: mod ? "100%" : "0%"
            }}
              className="w-1/2 border-t-2 border-gray-800">
            </motion.div>
          </div>
          
          {
            !mod ? (
              A
            ) : (
              B
            )
          }
        </div>
      </Container>
  );
}
  
  
  