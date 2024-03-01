"use client";

import { Spinner } from "@/components/spinner";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";  
import { SearchCommand } from "@/components/search-command";

const MainLayout = ({children}:{children : React.ReactNode;}) => {
    const {isSignedIn, isLoaded}= useUser();
    if(!isLoaded){
        return(
            <div className="h-full flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }
    if(!isSignedIn){
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
}
 
export default MainLayout;