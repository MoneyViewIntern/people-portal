"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useAuthContext } from "@/context/auth-context";
import { useAuth } from "@/hooks/use-auth";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isSignedIn, currentUser,viewedUser, setIsSignedIn,setCurrentUser, setViewedUser  } = useAuthContext();
 const {onClose} = useAuth();
  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.SERVER_URL}/login`, {
        username: username,
        password: password,
      });
      console.log("Server response:", response.data);
      console.log(response.status);
      if (response.status === 200 && response.data === true) {
        setIsSignedIn(true); // User found
        setCurrentUser(username);
        setViewedUser(username);
        toast.success("Logged in successfully!");
        onClose();

      }
    } catch (error) {
      if (error instanceof AxiosError) {
        let errorCode = error?.response?.status;
        if (errorCode === 401)toast.error("Invalid password. Please try again."); // Invalid Password
        else if (errorCode === 404) toast.error("Invalid Username."); // User username
        else toast.error("Unexpected error occurred.");
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-1 pb-3">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  );
}
