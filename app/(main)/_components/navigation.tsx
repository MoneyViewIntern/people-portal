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
import { Navbar } from "./navbar";
import { useAuthContext } from "@/context/auth-context";
import { useProfile } from "@/hooks/use-profile";
import EmployeeDetails from "./_profile-components/EmployeeDetails";
import EmployeeProfilePic from "./_profile-components/EmployeeProfilePic";
import EmployeeTags from "./_profile-components/EmployeeTags";
import Image from "next/image";
import { useProfileEdit } from "@/hooks/use-profile-edit";
import axios from "axios";

import { PROFILE_IMAGE_URL } from "@/Constants/constants";
import { Button } from "@/components/ui/button";

const fetchUserDetails = async (username: any) => {
  const { data } = await axios.get(
    `http://localhost:8080/api/user/${username}`
  );
  console.log(data);
  return data;
};

const Navigation = memo(() => {
  const { signOut, viewedUser, currentUser } = useAuthContext();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 1234px)");
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [userDetails, setUserDetails] = useState({
    name: "",
    displayImgUrl: "",
    badgeImgUrl: "",
    phoneNo: "",
    slackId: "",
    email: "",
    assignedTags: [],
  });

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

  useEffect(() => {
    (async () => {
      const userData = await fetchUserDetails(viewedUser);
      setUserDetails(userData);
    })();
  }, [viewedUser]);

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

  const handleDownloadTree = () => {
    console.log("downloading tree")
  }

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
            "h-7 w-7 mt-1 flex items-center justify-center text-muted-foreground rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div className="h-full space-y-3">
          <div className="h-[56px] dark:bg-[#1f1f1f] flex items-center">
            <div>
              <img src="/images/logo.png" alt="logo" className="h-9 w-9 mx-2" />
            </div>
            <p className="hidden sm:block font-black text-lg dark:drop-shadow-[0_0.9px_0.9px_rgba(0,140,0,0.8)] drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.8)] text-green-600" >
              People Portal
            </p>
          </div>

          <div className="flex justify-center">
            <p className="text-2xl flex justify-center items-center">
              {userDetails.name}

              {currentUser === viewedUser && (
                <Pen
                  className="hover:cursor-pointer ml-5"
                  onClick={handleProfileEdit}
                />
              )}
            </p>
          </div>

          <div>
            <EmployeeProfilePic
              defaultPfp={
                (userDetails && userDetails.displayImgUrl) || PROFILE_IMAGE_URL
              }
              avatarPfp={
                (userDetails && userDetails.badgeImgUrl) || PROFILE_IMAGE_URL
              }
              phoneNo={(userDetails && userDetails.phoneNo) || "1234567890"}
              slackId={(userDetails && userDetails.slackId) || ""}
              email={(userDetails && userDetails.email) || ""}
            />
          </div>
          <div>
            <EmployeeDetails empDetails={userDetails} />
          </div>
          <div>
            <EmployeeTags
              tags={(userDetails && userDetails.assignedTags) || []}
            />
          </div>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute w-1.5 bg-primary/10 right-0 top-[56px]"
          style={{ height: "calc(100% - 56px)" }}
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
        <div className="flex justify-end">
          <Button  className={cn(
            "bg-green-600 mt-2 mr-4 radius-lg",
            !isCollapsed && "hidden bg-red-500"
          )} onClick={handleDownloadTree}>
            Download Tree
          </Button>
        </div>
      </div>
    </>
  );
});

export default Navigation;
