"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Building, Shield } from "lucide-react";
import { toast } from "sonner";
const USERNAME = "arihant";
const DESIGNATION = "Software Developer";
const LEVEL = "3";
const PROFILEIMGURL = "https://randomuser.me/api/portraits/women/21.jpg";
const UserCard = () => {
  const handleCopy = (data: string) => {
    navigator.clipboard.writeText(data);
    toast.success(`Copied to clipboard!`);
  };

  return (
    <TooltipProvider>
      <div className=" flex items-center justify-center">
        <div className="w-[20rem] mx-auto rounded-lg shadow-lg hover:shadow-2xl">
          <div className="border-b px-4 pb-6 pt-4">
            <div className="text-center my-4">
              <img
                className="h-32 w-32 rounded-full border-2 hover:border-4 hover:shadow-2xl border-[#0B8C4C] dark:border-gray-500 mx-auto my-4"
                src={PROFILEIMGURL}
                alt="user profile"
              />
              <div className="py-2">
                <h3
                  onClick={() => handleCopy(USERNAME)}
                  className="font-bold text-xl text-gray-500 hover:text-black cursor-pointer dark:text-white mb-1"
                >
                  @{USERNAME}
                </h3>
                <div className="text-md inline-flex text-gray-700 dark:text-gray-300 items-center">
                  <Building className="h-5 w-5 font-semibold text-[#0B8C4C] dark:text-gray-400 mr-1" />
                  <Tooltip>
                    <TooltipTrigger>
                      <p className="text-muted-foreground text-sm">
                        {DESIGNATION.length > 30
                          ? DESIGNATION.slice(0, 20) + "..."
                          : DESIGNATION}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{DESIGNATION}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="text-md inline-flex text-gray-700 dark:text-gray-300 items-center">
                <Shield className="h-5 w-5 font-bold text-[#0B8C4C] dark:text-gray-400 mr-1" />
                L{LEVEL}
              </div>
            </div>
          </div>
          <div className="px-4 py-4">
            <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4"></div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
export default UserCard;
