"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCountriesWithFlags } from "@/lib/getCountriesWithFlags"
import Image from "next/image"

const countries = getCountriesWithFlags()

export default function CountrySelect({selectedCountry, setSelectedCountry}) {
  

  return (
    <Select onValueChange={setSelectedCountry} defaultValue={selectedCountry}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] overflow-y-auto">
        {countries.map((country) => (
          <SelectItem key={country.value} value={country.value}>
            <div className="flex items-center gap-2">
              <Image
                src={country.flag}
                alt={country.label}
                width={20}
                height={15}
                className="rounded-sm border"
              />
              <span>{country.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
