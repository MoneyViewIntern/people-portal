"use client";

import { Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProfileItemProps {
  name: string;
  description?: string;
  value: string;
  isEditable: boolean;
  onClick?: () => void;
}
const ProfileItem = ({
  name,
  description,
  value,
  onClick,
  isEditable,
}: ProfileItemProps) => {
  const handleClick = () => {
    if (isEditable) {
      if (onClick) onClick();
    } else toast.error("You don't have permission to edit this field");
  };
  return (
    <TooltipProvider>
      <div className="flex items-center justify-between">
        <div className="pt-5 flex flex-col gap-y-1">
   
              <div className="font-semibold text-left">
                {name}
              </div>
            
          <span className="text-[0.8rem] text-muted-foreground">
            {description}
          </span>
        </div>
        <div className=" flex items-center justify-between">
        <Tooltip>
            <TooltipTrigger>
            <p className="text-muted-foreground text-sm">
            {value.length > 20 ? value.slice(0, 15) + "..." : value}
          </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{value}</p>
            </TooltipContent>
          </Tooltip>
          
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "font-bold ml-2 rounded-full hover:text-foreground",
              !isEditable && "hover:cursor-not-allowed text-muted-foreground"
            )}
            onClick={handleClick}
          >
            <Pen className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};
export default ProfileItem;
