"use client";

import { useSearch } from "@/hooks/use-search";
import { redirect, useRouter } from "next/navigation";
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
import { useAuthContext } from "@/context/auth-context";
import axios from "axios";
import { File, User } from "lucide-react";
import { PROFILE_IMAGE_URL } from "@/Constants/constants";

const fetchName = async (value: string) => {
  const resp = await axios.get(`http://localhost:8080/api/search?e=${value}`);
  console.log(resp);
  return resp.data;
};

export const SearchCommand = () => {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState([]);
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

  // const handleSelect = (id: string) => {
  //   router.push(`/user/${id}`);
  //   onClose();
  // };
  const handleChange = async (e: any) => {
    if (e.target.value.length === 1) {
      const data = await fetchName(e.target.value);
      setSearched(data);
    }
    if (e.target.value.length === 0) {
      setSearched([]);
    }
    console.log(searched);
    console.log(e.target.value);
  };
  const handleSelect = (item: any) => {
    console.log("ITEM CLICKED");
    console.log(item);
    router.push(`/user/${item.username}`);
  };
  if (!isMounted) return null;

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        onChangeCapture={handleChange}
        placeholder={`Search ${currentUser}'s Portal...`}
      />

      <CommandList>
        <CommandEmpty>No results found</CommandEmpty>
        <CommandGroup heading={"Users"}>
          {searched?.map((item: any, key) => (
            <CommandItem key={key} value={item.name}>
              <div
                className="w-full flex justify-between hover:cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                <div className="flex">
                  {item.displayImgUrl ? (
                    <img
                      src={item.displayImgUrl}
                      className="mr-2 h-6 w-6 rounded-full"
                    />
                  ) : (
                    <img
                      src={PROFILE_IMAGE_URL}
                      className="mr-2 h-6 w-6 rounded-full"
                    />
                  )}
                  <p>{item.name} </p>
                </div>
                <div className="flex flex-between items-center">
                  <p className="ml-2 text-muted-foreground">
                    {" "}
                    @{item.username}{" "}
                  </p>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
