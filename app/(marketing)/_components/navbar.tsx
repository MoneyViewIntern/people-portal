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
  const IMGURL = "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png";
  const {isSignedIn}= useAuthContext();

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
          <Button onClick={handleAuth} variant="outline" size="sm" className="border-green-600">
          Sign In
        </Button>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
