"use client";
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import { cn } from "@/lib/utils";
// import { useUser } from "@clerk/clerk-react";
// import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import router, { useRouter } from "next/router";
// import { toast } from "sonner";
interface ItemProps{
    isSearch?:boolean;
    label: string;
    onClick?: ()=>void;
    icon: LucideIcon;
};

const Item = (
    {
    label, 
    onClick, 
    icon:Icon, 
    isSearch, 
    }: ItemProps) => {

    return ( 
        <div
        onClick= {onClick}
        role = "button"
        style = {{paddingLeft : "12px"}}
        className={"select-none group min-h-[12px] text-sm py-1 pr-3 w-full flex items-center text-muted-foreground font-medium  hover:bg-primary/5"}
        >
            <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground"/>
            <span className="truncate">
            {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border 
                bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘ + k</span>
                </kbd>
            )}
        </div>
     );
}
 
export default Item;

Item.Skeleton = function ItemSkeleton({level}: {level?:number}){
    return(
        <div style={{paddingLeft: level?`${(level*12)+25}px` : "12px"}} className="flex gap-x-2 py-[3px]">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />
        </div>
    )
}