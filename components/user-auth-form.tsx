"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from 'axios'
import jwt from 'jsonwebtoken'
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [username, setUsername]= useState("");
  const [password, setPassword]= useState("");
//   async function handleSubmit(event: React.SyntheticEvent) {
//     event.preventDefault();
//     setIsLoading(true);
//     try {
//         const token = jwt.sign({ username, password }, 'your-secret-key');
//         const response = await axios.post('http://localhost:8080/login', { token });
//         console.log('Server response:', response.data);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 500)
//   }
 // Dummy function to set loading button state
    async function handleSubmit(event: React.SyntheticEvent){
        event.preventDefault();
        setIsLoading(true);
        setTimeout(()=>{setIsLoading(false)},500);
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
              onChange={(e)=>setUsername(e.target.value)}
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
              onChange={(e)=>setPassword(e.target.value)}
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
  )
}