"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "../ui/button";
import {
  Download,
  Edit,
  Facebook,
  LogOut,
  Pen,
  Pencil,
  Slack,
  Twitter,
} from "lucide-react";
import { useAuthContext } from "@/context/auth-context";
import { useProfile } from "@/hooks/use-profile";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/seperator";
import ProfileItem from "../profile-item";
import { toast } from "sonner";
export const ProfileModal = () => {
  const profile = useProfile();
  const IMGURL =
    "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png";

  return (
    <Dialog open={profile.isOpen} onOpenChange={profile.onClose}>
      <DialogContent className="md:h-[90%] h-full w-full overflow-auto">
        <DialogHeader className="flex items-center border-b pb-3">
          <h2 className="text-xl font-bold">Your Profile</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="ml-[30%] rounded-full">
            <Download className="h-5 w-5" />
          </Button>
          <Avatar className="h-12 w-12 relative z-10">
            <AvatarImage src={IMGURL} />
          </Avatar>
          <Button variant="ghost" className="mr-[30%] rounded-full">
            <Pen className="h-5 w-5" />
          </Button>
        </div>
        <Separator />
        <ProfileItem
          name="Username"
          description="Your Username"
          value="Username"
          onClick={() => {}}
          isEditable={true}
        />
        <ProfileItem
          name="Email Id"
          description="Your Registered Email"
          value="abcd@moneyview.in"
          isEditable={false}
        />
        <ProfileItem
          name="Name"
          description="Your Name"
          value="Arihant Agnihotri"
          onClick={() => {}}
          isEditable={true}
        />
        <ProfileItem
          name="Phone Number"
          value="+91-9044040088"
          isEditable={false}
        />
        <ProfileItem
          name="Designation"
          description="Your Role"
          value="SDE"
          isEditable={false}
        />
        <ProfileItem
          name="Experience"
          description="Your Experience Level"
          value="L3"
          isEditable={false}
        />
        <div className="flex items-center justify-center pt-5">
          <h2 className="text-lg font-bold">Connections</h2>
        </div>
        <Separator />
        <div className="flex justify-between items-center px-9">
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
      </DialogContent>
    </Dialog>
  );
};
