"use client";

import { useAuthContext } from "@/context/auth-context";
import { redirect } from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useAuthContext();
  if (!isSignedIn) {
    return redirect("/");
  }
  return (
    <div className="h-full flex dark:bg-[#1a1919]">
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
