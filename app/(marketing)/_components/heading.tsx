"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useAuthContext } from "@/context/auth-context";
import { useRouter } from "next/navigation"; // Import the useRouter hook
export const Heading = () => {
  const { isSignedIn } = useAuthContext();
  const handleAuth = useAuth().onOpen;
  const router = useRouter(); // Initialize useRouter
  // Redirect user to /welcome if signed in
  if (isSignedIn) {
    router.push("/welcome");
    return null; // Return null to avoid rendering anything else
  }
  return (
    <div className=" max-w-3xl space-y-4">
      <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl ">
        Connect with your peers{" "}
        <span className="underline"> People Portal </span>
      </h1>
      <h3 className="font-medium text-base sm:text-xl md:text-2xl">
        People Portal is a collection of all the employee data <br />
        under one roof.
      </h3>
      {!isSignedIn && (
        <Button onClick={handleAuth}>
          Sign In to People Portal
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};