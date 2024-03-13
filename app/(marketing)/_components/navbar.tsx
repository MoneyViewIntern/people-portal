"use client";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
const Navbar = () => {
  const scrolled = useScrollTop();
  const handleAuth = useAuth().onOpen;
  const {isSignedIn, currentUserDetails}= useAuthContext();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1a1919] fixed top-0 flex items-center w-full p-5",
        scrolled && "border-b shadow-md"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {!isSignedIn && (
          <Button onClick={handleAuth} variant="outline" size="sm">
          Sign In
        </Button>
        )}
        {isSignedIn && (
          <>
            <Button variant="outline" size="sm" asChild>
              <Link href="/welcome">Enter Portal</Link>
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarImage src={currentUserDetails.displayImgUrl? currentUserDetails.displayImgUrl : "/images/logo.png"} />
            </Avatar>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
