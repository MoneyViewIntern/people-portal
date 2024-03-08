"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/seperator";
import { Building, Facebook, Slack, Twitter } from "lucide-react";
import { toast } from "sonner";
const USERNAME = "arihant";
const UserCard = () => {
  const handleUsernameCopy = (username: string) => {
    navigator.clipboard.writeText(username);
    toast.success(`Copied ${username} to clipboard!`);
  };
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-sm mx-auto rounded-lg  shadow-lg">
        <div className="border px-4 pb-6">
          <div className="text-center my-4">
            <img
              className="h-32 w-32 rounded-full border-4 border-[#0B8C4C] dark:border-gray-500 mx-auto my-4"
              src="https://randomuser.me/api/portraits/women/21.jpg"
              alt=""
            />
            <div className="py-2">
              <h3
                onClick={() => handleUsernameCopy(USERNAME)}
                className="font-bold text-xl text-gray-500 hover:text-black cursor-pointer dark:text-white mb-1"
              >
                @{USERNAME}
              </h3>
              <div className="text-md inline-flex text-gray-700 dark:text-gray-300 items-center">
                <Building className="h-5 w-5 font-semibold text-[#0B8C4C] dark:text-gray-400 mr-1" />
                Software Developer
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-4">
          <div className="flex justify-between">
            <Slack
              className="m-2 text-muted-foreground hover:text-foreground"
              role="button"
              onClick={() => {}}
            />
            <Twitter
              className="m-2 text-muted-foreground hover:text-foreground"
              role="button"
              onClick={() => {}}
            />
            <Facebook
              className="m-2 text-muted-foreground hover:text-foreground"
              role="button"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
