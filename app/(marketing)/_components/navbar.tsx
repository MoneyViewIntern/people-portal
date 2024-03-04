"use client";
import { useUser, SignInButton, UserButton, SignUpButton } from "@clerk/nextjs";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";
import { useAuth } from "@/hooks/use-auth";
const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();
  const scrolled = useScrollTop();
  const handleAuth = useAuth().onOpen;
  // const {isSignedIn}= useAuthContext();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1a1919] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-md"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {!isSignedIn && (
          <SignInButton>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </SignInButton>
          // For using auth
        //   <Button onClick={handleAuth} variant="outline" size="sm">
        //   Sign In
        // </Button>
        )}
        {isSignedIn && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/welcome">Enter Portal</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
