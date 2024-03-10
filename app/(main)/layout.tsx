"use client";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";
import { useAuthContext } from "@/context/auth-context";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const {isSignedIn} = useAuthContext();
  if (!isSignedIn) {
    return redirect("/");
  }
  return (
    <div className="h-full flex dark:bg-[#1a1919]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
