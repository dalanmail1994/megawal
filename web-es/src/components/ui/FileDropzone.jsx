"use client"

import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"

export default function FileDropzone({ name }) {
  const [selectedFile, setSelectedFile] = useState(null)

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setSelectedFile(file)
      }
    },
    []
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border rounded-lg h-[270px] flex items-center justify-center cursor-pointer transition-colors duration-300",
        selectedFile
          ? "bg-blue-200"
          : "bg-gray-100 hover:bg-blue-100 hover:border-blue-300"
      )}
    >
      <input {...getInputProps()} name={name} />
      <div className="flex flex-col items-center space-y-2">
        <img src="/flags/ic-drop.png" className="h-[100px]" />
        <h2 className="text-lg font-bold">Drop or select file</h2>
        <span className="text-sm font-medium text-gray-600">
          Drop files here or click to browse through your machine.
        </span>

        {selectedFile && (
          <span className="mt-2 text-sm font-medium text-blue-800">
            {selectedFile.name}
          </span>
        )}
      </div>
    </div>
  )
}
