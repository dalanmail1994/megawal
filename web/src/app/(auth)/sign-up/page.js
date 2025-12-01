"use client"

import Container from "@/components/co/container";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { postRequest } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formDataToObject } from "@/lib/utils";


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();


  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const obj = formDataToObject(formData);
    try {
      const res = await postRequest("/users", obj);
      console.log(res)
      localStorage.setItem('authToken', res?.token)
      router.push('/')

    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <Container s="shadow-md" w="max-w-[420px] w-full">
      <div className="flex flex-col items-center space-y-8 py-4">
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-full p-6">
          <img src="/flags/logo.svg" className="h-[40px]" />
        </div>


        <div className="flex flex-col items-center space-y-4">
          <h2 className="font-extrabold text-xl">Get started absolutely free</h2>
          <div className="flex flex-row space-x-1 text-[0.875rem]">
            <span className="text-gray-500">Already have an account?</span>
            <Link href={"/login"} className="text-blue-600 font-semibold">Sign in</Link>
          </div>
        </div>
        <form onSubmit={handleRegister} className="space-y-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" name="first_name" placeholder="John" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" name="last_name" placeholder="Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" name="email" placeholder="you@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" name="password" placeholder="********" />
          </div>

          <span className="text-sm font-medium text-red-500">{error}</span>

          <Button className="w-full mt-4 font-bold py-6 bg-gray-900">Create account</Button>
        </form>
        <div className="text-center text-[12px] font-medium text-gray-400">
          <span>By signing up, I agree to <span className="underline text-gray-700">Terms of service</span> and <span className="underline text-gray-700">Privacy policy</span>.</span>
        </div>
      </div>
    </Container>
  );
}
  

