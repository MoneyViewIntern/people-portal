"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft, Pen, Search, Settings, User } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  ElementRef,
  useRef,
  useState,
  useCallback,
  memo,
  useEffect,
} from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./user-item";
import Item from "./item";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { Navbar } from "./navbar";
import { useAuthContext } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/use-profile";
import EmployeeDetails from "./_profile-components/EmployeeDetails";
import EmployeeProfilePic from "./_profile-components/EmployeeProfilePic";
import EmployeeTags from "./_profile-components/EmployeeTags";
import Image from "next/image";
import { useProfileEdit } from "@/hooks/use-profile-edit";

const Navigation = memo(() => {
  const { signOut } = useAuthContext();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 769px)");
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleProfile = useProfile().onOpen;
  const handleProfileEdit = useProfileEdit().onOpen;

  const collapse = useCallback(() => {
    if (!sidebarRef.current || !navbarRef.current) return;

    setIsCollapsed(true);
    setIsResetting(true);
    sidebarRef.current.style.width = "0";
    navbarRef.current.style.width = "100%";
    navbarRef.current.style.left = "0";
    setTimeout(() => setIsResetting(false), 300);
  }, [sidebarRef, navbarRef]);

  const resetWidth = useCallback(() => {
    if (!sidebarRef.current || !navbarRef.current) return;

    setIsCollapsed(false);
    setIsResetting(true);
    sidebarRef.current.style.width = isMobile ? "100%" : "550px";
    navbarRef.current.style.width = isMobile ? "0" : "calc(100% - 550px)";
    navbarRef.current.style.left = isMobile ? "100%" : "550px";
    setTimeout(() => setIsResetting(false), 300);
  }, [isMobile, sidebarRef, navbarRef]);

  useEffect(() => {
    if (isMobile) collapse();
    else resetWidth();
  }, [isMobile, collapse, resetWidth]);

  useEffect(() => {
    if (isMobile) collapse();
  }, [pathname, isMobile, collapse]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!sidebarRef.current || !navbarRef.current) return;

      let newWidth = e.clientX;
      newWidth = Math.max(350, Math.min(840, newWidth));

      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.left = `${newWidth}px`;
      navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
    },
    [sidebarRef, navbarRef]
  );

  useEffect(() => {
    resetWidth();
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  // for profile
  const [showEditPage, setShowEditPgae] = useState(false);
  const handleClose = () => setShowEditPgae(false);
  const handleShow = () => setShowEditPgae(true);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0",
          isCollapsed && "opacity-0 transition-all ease-in-out duration-500"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-7 w-7 flex items-center justify-center text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div className="h-full space-y-3">
          <div className="h-[3.85rem] dark:bg-[#1f1f1f] flex items-center">
            <div className="w-12 h-12 mr-2">
              <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
            </div>
            <p className="text-green-500">People Portal</p>
          </div>

          {/* profile has been inserted here  */}
          <div className="flex justify-center">
            <p className="text-2xl flex justify-center items-center">
              Arihant Agnihotri
              <Pen
                className="hover:cursor-pointer ml-5"
                onClick={handleProfileEdit}
              />
            </p>
          </div>

          <div>
            <EmployeeProfilePic
              defaultPfp="/images/emp1.jpeg"
              avatarPfp="/images/emp2.jpeg"
            />
          </div>
          <div>
            <EmployeeDetails />
          </div>
          <div>
            <EmployeeTags />
          </div>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1.5 bg-primary/10 right-0 top-0"
        />
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent w-full">
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        </nav>
      </div>
    </>
  );
});

export default Navigation;
