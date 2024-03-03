"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useSettings } from "@/hooks/use-settings";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { SignOutButton, UserButton, UserProfile} from "@clerk/nextjs";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
export const SettingsModal = () => {
  const settings = useSettings();
  const router = useRouter();
  const handleLogout = () => {
    settings.onClose();
    router.push("/");
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
            <Label>Log Out</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Sign out of your portal
            </span>
          </div>
          <Button onClick={handleLogout} variant="ghost" size="icon">
            <SignOutButton>
              <LogOut className="h-[1.2rem] w-[1.2rem] scale-100" />
            </SignOutButton>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
