"use client";

import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { MenuIcon , Search , Settings} from "lucide-react";
import Item from "./item";
import { cn } from "@/lib/utils";

interface NavbarProps{
    isCollapsed : boolean;
    onResetWidth : ()=>void;
};
export const Navbar = ({isCollapsed, onResetWidth}:NavbarProps)=>{
    const handleSearch = useSearch().onOpen;
    const handleSettings = useSettings().onOpen;
    return (
        <>
            <nav className={cn( "bg-background dark:bg-[#1F1F1F] px-3 py-1.5 bg-neutral-100 w-full flex items-center justify-between", !isCollapsed && "hidden md:flex"
            )}>
                <div className="flex items-center gap-x-4">
                    {isCollapsed && (
                        <MenuIcon
                            role="button"
                            onClick={onResetWidth}
                            className="h-6 w-6 text-muted-foreground"
                        />
                    )}
                </div>
                <div className="items-center gap-x-2">
                    <div className="flex gap-x-2">
                        <Item label="" icon={Search} isSearch onClick={handleSearch} />
                        <Item label="" icon={Settings} onClick={handleSettings} />
                    </div>
                </div>
            </nav>
        </>
    );
}    