"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building } from "lucide-react";
import { toast } from "sonner";
const USERNAME = "arihant"
const UserCard = () => {
  const handleUsernameCopy=(username: string)=>{
    navigator.clipboard.writeText(username);
    toast.success(`Copied ${username} to clipboard!`);
  }
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-sm mx-auto rounded-lg  shadow-lg">
        <div className="border-b px-4 pb-6">
          <div className="text-center my-4">
            <img
              className="h-32 w-32 rounded-full border-4 border-[#0B8C4C] dark:border-gray-500 mx-auto my-4"
              src="https://randomuser.me/api/portraits/women/21.jpg"
              alt=""
            />
            <div className="py-2">
              <h3 onClick={()=>handleUsernameCopy(USERNAME)} className="font-bold text-xl text-gray-500 hover:text-black cursor-pointer dark:text-white mb-1">
                @{USERNAME}
              </h3>
              <div className="text-md inline-flex text-gray-700 dark:text-gray-300 items-center">
                <Building className="h-5 w-5 font-semibold text-[#0B8C4C] dark:text-gray-400 mr-1"/>
                Software Developer
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-4">
          <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
            <svg
              className="h-6 w-6 text-gray-600 dark:text-gray-400"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                className=""
                d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
              />
            </svg>

            <span>
              <strong className="text-black dark:text-white">12</strong>{" "}
              Followers you know
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
