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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();
  const scrolled = useScrollTop();
  const handleAuth = useAuth().onOpen;
  const IMGURL = "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png";
  // const {isSignedIn}= useAuthContext();
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
            <Button variant="outline" size="sm" asChild>
              <Link href="/welcome">Enter Portal</Link>
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarImage src={IMGURL} />
            </Avatar>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
