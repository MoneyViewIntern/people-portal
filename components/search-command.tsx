"use client";

import { useSearch } from "@/hooks/use-search";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";

export const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  //preventing rendering on server side so that shadcn command component does not cause hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key == "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const handleSelect = (id: string) => {
    router.push(`/user/${id}`);
    onClose();
  };

  if (!isMounted) return null;

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.username}'s Portal...`} />
      <CommandList>
        <CommandEmpty>No results found</CommandEmpty>
        <CommandGroup heading="Users">
          <CommandItem>
            <span>User</span>
          </CommandItem>
          <CommandItem>
            <span>Us</span>
          </CommandItem>
          <CommandItem>
            <span>Use</span>
          </CommandItem>
          <CommandItem>
            <span>Uer</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Tags">
          <CommandItem>
            <span>Developer</span>
          </CommandItem>
          <CommandItem>
            <span>Developer</span>
          </CommandItem>
          <CommandItem>
            <span>User</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
