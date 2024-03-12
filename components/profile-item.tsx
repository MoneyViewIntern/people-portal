"use client";
import { Pen } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {TooltipProvider} from "@/components/ui/tooltip";
import { useRef, useState } from "react";
import { Input } from "./ui/input";

interface ProfileItemProps {
  name: string;
  description?: string;
  value: string;
  isEditable: boolean;
}
const ProfileItem = ({
  name,
  description,
  value,
  isEditable,
}: ProfileItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue]= useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const disableInput = () => {
    setIsEditing(false);
  };
  const enableInput = () => {
    setIsEditing(true);
  };
  const handleClick = () => {
    if (isEditable) {
      setIsEditing(!isEditing);
    } else toast.error("You don't have permission to edit this field");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(event.target.value);
    // On Change update name
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") disableInput();
  };

  return (
    <TooltipProvider>
      <div className="flex items-center justify-between">
        <div className="pt-5 flex flex-col gap-y-1">
          <div className="font-semibold text-left">{name}</div>

          <span className="text-[0.8rem] text-muted-foreground">
            {description}
          </span>
        </div>
        <div className=" flex items-center justify-between">
          <div>

          {isEditing ? (
            <Input
              ref={inputRef}
              onClick={enableInput}
              onBlur={disableInput}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={newValue}
              className="text-sm h-7 w-full focus-visible:ring-transparent"
            />
          ) : (
            <p className="text-muted-foreground text-sm">
              {value.length > 20 ? value.slice(0, 15) + "..." : value}
            </p>
          )}
          </div>
          <div>
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
      </div>
    </TooltipProvider>
  );
};
export default ProfileItem;
