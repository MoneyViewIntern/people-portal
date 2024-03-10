"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-context";

const UserItem = () => {
  const {signOut} = useAuthContext();

  // Hardcoded username and profile url
  const USERNAME= "Username";
  const IMGURL = "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-md py-6 p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-x-3 flex items-center max-w-[250px]">
            <Avatar className="h-9 w-9">
              <AvatarImage src={IMGURL} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {USERNAME}&apos;s Portal
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <div className="flex items-center gap-x-2">
            <div className="rounded-md p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={IMGURL} />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-md line-clamp-1">Hi {USERNAME}!</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground"
        >
          <Button onClick={signOut} variant={"ghost"}>
              Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
