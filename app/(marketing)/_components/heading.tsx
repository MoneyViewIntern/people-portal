"use client";
import { Spinner } from "@/components/spinner";
import {Button} from "@/components/ui/button"
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";
export const Heading =()=>{
    const {isSignedIn, user, isLoaded}= useUser();
    return(
        <div className=" max-w-3xl space-y-4">
            <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl ">
                Connect with your peers <span className="underline"> People Portal </span>
            </h1>
            <h3 className="font-medium text-base sm:text-xl md:text-2xl">
                People Portal is a collection of all the employee data <br />
                under one roof.
            </h3>
            {!isLoaded && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg" />
                </div>
            )}
            {isSignedIn && isLoaded && (
                <Button asChild>
                    <Link href="/welcome">
                        Enter Portal
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
            )}
            {!isSignedIn && isLoaded && (
                <SignInButton mode="modal">
                    <Button>
                        Sign In to People Portal
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </SignInButton>
            )}
        </div>
    )
}