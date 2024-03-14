"use client";

import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { MenuIcon, Search, Settings, User } from "lucide-react";
import Item from "./item";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/auth-context";
import { toast } from "sonner";
import NavbarTitle from "./navbar-title";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}
export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const handleSearch = useSearch().onOpen;
  const handleSettings = useSettings().onOpen;

  const { currentUser, viewedUser, setViewedUser } = useAuthContext();
  const handleProfileReset = () => {
    if (viewedUser === currentUser)
      toast.error("Your profile is already selected");
    else {
      setViewedUser(currentUser);
    }
  };
  return (
    <>
      <nav
        className={cn(
          "bg-background dark:bg-[#1F1F1F] px-3 py-1.5 bg-neutral-100 w-full flex items-center justify-between",
          !isCollapsed && "hidden xl:flex"
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
              <NavbarTitle />
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
