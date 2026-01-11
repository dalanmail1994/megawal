import { useState } from "react";
import Container from "../co/container";
import { Button } from "../ui/button";
import FileDropzone from "../ui/FileDropzone";
import { toast } from "sonner"
import { postFileRequest } from "@/lib/api";



export default function VerificationAcc({}) {
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState({
        passport: null,
        address_proof: null,
        selfie: null,
    })

    const handleFileSelect = (field, file) => {
        setFiles((prev) => ({ ...prev, [field]: file }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        Object.entries(files).forEach(([field, file]) => {
            if (file) {
                formData.append(field, file)
            }
        })

        try {
            const res = await postFileRequest('/kyc/upload', formData);
            toast.success(res.message || "Uploaded successfully");
            e.target.reset();
            setFiles({ passport: null, address_proof: null, selfie: null })
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };


  

    
    return (
        <Container>
            <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium text-gray-800">ID Card / Passport</span>
                    <FileDropzone name="passport" onFileSelect={handleFileSelect} />
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium text-gray-800">Address Proof</span>
                    <FileDropzone name="address_proof" onFileSelect={handleFileSelect} />
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium text-gray-800">Selfie with ID Card</span>
                    <FileDropzone name="selfie" onFileSelect={handleFileSelect} />
                </div>
                <Button type="submit" className='font-semibold' disabled={loading}>Upload files</Button>
            </form>
        </Container>
  );
}




