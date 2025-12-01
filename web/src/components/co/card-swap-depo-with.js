"use client"

import { useState } from "react";
import Container from "./container";
import { motion } from "motion/react"

export default function CardSwapDepoWith({mod, setMood}) {

    return (
      <div className="flex flex-col">
        <div className={`flex flex-row justify-between [&>div]:flex ${setMood ? '[&>div]:cursor-pointer' : ''} font-semibold text-[14px] [&>div]:justify-center [&>div]:py-3 [&>div]:w-1/2`}>
          <div onClick={setMood ? () => setMood(true) : () => {}}>
            <span className="text-green-600">Deposit</span>
          </div>
          <div onClick={setMood ? () => setMood(false) : () => {}}>
            <span className="text-red-600">Withdrawl</span>
          </div>
        </div>

        <div className="w-full bg-gray-100">
          <motion.div 
            animate={{x: mod ? "0%" : "100%"}}
            className="w-1/2 border-t-2 border-gray-800"
            transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}  
          >
          </motion.div>
        </div>
      </div>
    );
  }
  
  
  