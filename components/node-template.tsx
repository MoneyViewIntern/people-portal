"use client";

import { Building, Shield } from "lucide-react";
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
  displayImg?: string;
}
const NodeTemplate = ({
  name,
  username,
  designation,
  level,
  displayImg,
}: NodeTemplateProps) => {
  return (
    <TooltipProvider>
      <div className="select-none flex gap-y-2 flex-col w-[180px]  border-2  bg-secondary/60 shadow-md py-2">
        <div className="flex items-center justify-center">
          <img
            src={displayImg ? displayImg : PROFILE_IMAGE_URL}
            className="rounded-full border-2  h-8 w-8"
          />
          <Tooltip>
            <TooltipTrigger>
              <p className="mt-[1px] ml-2 font-bold text-[16px] text-gray-500 hover:text-black cursor-pointer dark:text-white ">
                {name && name.length > 18 ? name.slice(0, 14) + "..." : name}
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
              <p className="mt-[2px] ml-2  text-[12px] text-gray-500 hover:text-black cursor-pointer dark:text-white ">
                {designation && designation.length > 20
                  ? designation.slice(0, 19) + "..."
                  : designation}
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
