"use client"
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-context";
import Link from "next/link";

const WelcomePage = () => {
  const {currentUser} = useAuthContext();
  return(
    <div className="flex flex-col justify-center items-center h-full w-full">
    <h1 className="text-6xl md:text-9xl 3xl:text-[20rem] font-bold text-center mb-8 animate-pulse animate-once animate-delay-500">
      Welcome
    </h1>
    <Button className="hover:font-bold py-7 px-8 rounded" asChild>
      <Link href={`/user/${currentUser}`}>
        Proceed
      </Link>
    </Button>
  </div>
)}
 
export default WelcomePage;


