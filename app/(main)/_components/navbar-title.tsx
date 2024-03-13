"use client";

import { useAuthContext } from "@/context/auth-context";
import { toast } from "sonner";

const NavbarTitle = () => {
  const { currentUser, viewedUser, setViewedUser } = useAuthContext();
  const handleProfileReset = () => {
    if (viewedUser === currentUser)
      toast.error("Your profile is already selected");
    else {
      setViewedUser(currentUser);
    }
  };
  return (
    <div
      onClick={handleProfileReset}
      className="hover:cursor-pointer flex items-center"
    >
      <div>
        <img src="/images/logo.png" alt="logo" className="h-9 w-9 mx-2" />
      </div>
      <p
        className="hidden sm:block font-black dark:drop-shadow-[0_0.9px_0.9px_rgba(0,140,0,0.8)] drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.8)]
 text-green-600"
      >
        People Portal
      </p>
    </div>
  );
};

export default NavbarTitle;
