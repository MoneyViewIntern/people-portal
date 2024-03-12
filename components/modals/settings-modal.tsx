"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useSettings } from "@/hooks/use-settings";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "../ui/button";
import { LogOut, User } from "lucide-react";
import { useAuthContext } from "@/context/auth-context";
import { toast } from "sonner";
export const SettingsModal = () => {
  const settings = useSettings();

  const {signOut, currentUser, viewedUser, setViewedUser}= useAuthContext();

  const handleLogout = () => {
    settings.onClose();
    signOut();
  };
  
  const handleProfileChange=()=>{
    if(viewedUser===currentUser) toast.error("Your profile is already selected")
    else setViewedUser(currentUser);
  };

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Portal looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>My Profile</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              View your profile
            </span>
          </div>
          <Button onClick={handleProfileChange} variant="ghost" size="icon">
              <User className="h-[1.2rem] w-[1.2rem] scale-100" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Log Out</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Sign out of your portal
            </span>
          </div>
          <Button onClick={handleLogout} variant="ghost" size="icon">
              <LogOut className="h-[1.2rem] w-[1.2rem] scale-100" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
