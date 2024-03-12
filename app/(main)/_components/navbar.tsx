"use client";

import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { MenuIcon , Search , Settings} from "lucide-react";
import Item from "./item";

interface NavbarProps{
    isCollapsed : boolean;
    onResetWidth : ()=>void;
};
export const Navbar = ({isCollapsed, onResetWidth}:NavbarProps)=>{
    // return(
    //     <>
    //     <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-3.5 w-full flex items-center gap-x-4">
    //         {isCollapsed && (
    //             <MenuIcon
    //             role="button"
    //             onClick={onResetWidth}
    //             className="h-6 w-6 text-muted-foreground"/>
    //         )}
    //         <div className="flex items-center justify-between w-full">
    //           <p className="text-xl"> Title </p>
    //             <div className="flex items-center gap-x-2">
    //               <p className="bg-red-500"> Arihant </p>
    //             </div>
    //         </div>
    //     </nav>
    //     </>
    // )}

    const handleSearch = useSearch().onOpen;
    const handleSettings = useSettings().onOpen;

    return (
        <>
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-1.5 bg-neutral-100 w-full flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                    {isCollapsed && (
                        <MenuIcon
                            role="button"
                            onClick={onResetWidth}
                            className="h-6 w-6 text-muted-foreground"
                        />
                    )}
                </div>
                <div className="flex items-center gap-x-2">
                    <div className="flex gap-x-2">
                        <Item label="" icon={Search} isSearch onClick={handleSearch} />
                        <Item label="" icon={Settings} onClick={handleSettings} />
                    </div>
                </div>
            </nav>
        </>
    );
}    