"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, 
        DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronsLeftRight } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UserItem = () => {
    const {user}= useUser();

    return ( 
        <DropdownMenu> 
            <DropdownMenuTrigger asChild>
                <div role="button" className="flex items-center text-sm py  -6 p-3 w-full hover:bg-primary/5">
                    <div className="gap-x-3 flex items-center max-w-[150px]">
                        <Avatar className="h-5 w-5">
                            <AvatarImage src={user?.imageUrl} />
                        </Avatar>
                        <span className="text-start font-medium line-clamp-1">
                            {user?.username}&apos;s Portal
                        </span>
                    </div>
                    <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="start" alignOffset={11} forceMount>
                <div className="flex flex-col space-y-4 p-2">
                    <div className="flex items-center gap-x-2">
                        <div className="rounded-md p-1">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.imageUrl}/>
                            </Avatar>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm line-clamp-1">
                                Hi {user?.username}!
                            </p>

                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="w-full cursor-pointer text-muted-foreground">
                <Button variant={"ghost"} asChild>
                   <SignOutButton>
                   <Link href="/">Sign Out</Link>
                    </SignOutButton> 
                </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
     );
}
 
export default UserItem;