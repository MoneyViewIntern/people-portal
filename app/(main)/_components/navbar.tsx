"use client";

import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { MenuIcon, Search, Settings, User } from "lucide-react";
import Item from "./item";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}
export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const handleSearch = useSearch().onOpen;
  const handleSettings = useSettings().onOpen;

  return (
    <>
      <nav
        className={cn(
          "bg-background dark:bg-[#1F1F1F] px-3 py-1.5 bg-neutral-100 w-full flex items-center justify-between",
          !isCollapsed && "hidden md:flex"
        )}
      >
        <div className="flex items-center gap-x-4">
          {isCollapsed && (
            <div className="flex">
              <MenuIcon
                role="button"
                onClick={onResetWidth}
                className="h-6 w-6 mt-2 text-muted-foreground"
              />
              <div className="flex items-center">
                <div>
                  <img
                    src="/images/logo.png"
                    alt="logo"
                    className="h-9 w-9 mx-2"
                  />
                </div>
                <p
                  className="hidden sm:block font-black dark:drop-shadow-[0_0.9px_0.9px_rgba(0,140,0,0.8)] drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.8)]
 text-green-600"
                >
                  People Portal
                </p>
              </div>
            </div>
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
};
