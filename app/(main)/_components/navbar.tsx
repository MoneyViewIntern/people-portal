"use client";

import { MenuIcon } from "lucide-react";

interface NavbarProps{
    isCollapsed : boolean;
    onResetWidth : ()=>void;
};
export const Navbar = ({isCollapsed, onResetWidth}:NavbarProps)=>{
    return(
        <>
        <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
            {isCollapsed && (
                <MenuIcon
                role="button"
                onClick={onResetWidth}
                className="h-6 w-6 text-muted-foreground"/>
            )}
            <div className="flex items-center justify-between w-full">
              <p className="text-xl"> Title </p>
                <div className="flex items-center gap-x-2">
                  <p className="bg-red-500"> Arihant </p>
                </div>
            </div>
        </nav>
        </>
    )}