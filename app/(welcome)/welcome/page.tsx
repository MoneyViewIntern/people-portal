"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";

const WelcomePage = () => {
  return(
    <div className="flex flex-col justify-center items-center h-screen">
    <h1 className="text-9xl font-bold text-center mb-8 animate-pulse animate-duration-9999 animate-once animate-delay-500 animate-ease-in animate-reverse">Welcome</h1>
    <Button className="hover:font-bold py-7 px-8 rounded" asChild>
      <Link href="/user">
        Proceed
      </Link>
    </Button>
  </div>
)}
 
export default WelcomePage;


