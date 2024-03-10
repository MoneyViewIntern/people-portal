"use client";

import { Building, Shield, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { PROFILE_IMAGE_URL } from "@/Constants/constants";

interface NodeTemplateProps {
  name: string;
  username: string;
  designation: string;
  level: string;
  profileImg?: string;
}
const NodeTemplate = ({
  name,
  username,
  designation,
  level,
  profileImg,
}: NodeTemplateProps) => {
  return (
    <TooltipProvider>
      <div className="rounded-[10px] flex gap-y-3 flex-col w-[200px] h-[90px] border-2 shadow-md p-2">
        <div className="flex items-center justify-center">
          {/* <User className="h-6 w-6 stroke-1" />
           */}
           <div className="h-8 w-8">
            <img src={profileImg?profileImg:PROFILE_IMAGE_URL} className="rounded-full h-8 w-8"/>
           </div>
          <Tooltip>
            <TooltipTrigger>
              <p className="mt-[3px] ml-2 font-bold text-[15px] text-gray-500 hover:text-black cursor-pointer dark:text-white mb-1">
                {name.length > 18 ? name.slice(0, 14) + "..." : name}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs font-thin">@{username}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex justify-center">
          <Building className="  text-[#0B8C4C] dark:text-gray-400 ml-1 h-5 w-6" />
          <Tooltip>
            <TooltipTrigger>
              <p className="mt-[3px] ml-2  text-xs text-gray-500 hover:text-black cursor-pointer dark:text-white mb-1">
                {designation.length > 20 ? designation.slice(0, 19) + "..." : designation}
              </p>
            </TooltipTrigger>
            <TooltipContent className="flex justify-between">
            <Shield className="mt-[1px] h-3 w-3 text-[#0B8C4C] dark:text-gray-400 mr-1" />
              <p className="text-xs">L{level}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
      </div>
    </TooltipProvider>
  );
};
export default NodeTemplate;
