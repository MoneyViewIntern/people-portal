"use client";

import { useSearch } from "@/hooks/use-search";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useAuthContext } from "@/context/auth-context";
import axios from "axios";
import { PROFILE_IMAGE_URL } from "@/Constants/constants";
import { Tag, Users } from "lucide-react";
import { useTagSearch } from "@/hooks/use-tag-search";

const fetchName = async (value: string) => {
  const resp = await axios.get(`http://localhost:8080/api/search?e=${value}`);
  console.log(resp);
  return resp.data;
};
const fetchTag = async (value: string) => {
  const resp = await axios.get(`http://localhost:8080/api/search?t=${value}`);
  console.log(resp);
  return resp.data;
};
export const SearchCommand = () => {
  const { currentUser, viewedUser, setViewedUser } = useAuthContext();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [searchedEmployee, setSearchedEmployee] = useState([]);
  const [searchedTag, setSearchedTag] = useState([]);
  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);
  const tagOnOpen = useTagSearch((store)=>store.onOpen);
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

  const handleChange = async (e: any) => {
    if (e.target.value.length === 1) {
      const empData = await fetchName(e.target.value);
      const tagData = await fetchTag(e.target.value);
      setSearchedTag(tagData);
      setSearchedEmployee(empData);
    }
    if (e.target.value.length === 0) {
      setSearchedEmployee([]);
      setSearchedTag([]);
    }
    console.log(searchedTag);
    console.log(searchedEmployee);
    console.log(e.target.value);
  };
  const handleSelect = (item: any) => {
    console.log("ITEM CLICKED");
    console.log(item);
    setViewedUser(item.username);
    router.push(`/user/${item.username}`)
    toggle();
    setViewedUser((prevUser) => {
      console.log(`Viewed user : ${prevUser}`);
      return item.username;
    });
  };
  const handleSelectTag = (item: any) => {
    console.log("TAG CLICKED");
    console.log(item);
    tagOnOpen();
    toggle();

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
        <CommandGroup heading={`Users`}>
          {searchedEmployee?.map((item: any, key) => (
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
        <CommandGroup heading={`Tags`}>
          {searchedTag?.map((item: any, key) => (
            <CommandItem key={key} value={item.name}>
              <div
                className="hover:cursor-pointer w-full flex justify-between"
                onClick={() => handleSelectTag(item)}
              >
                <div className="flex">
                  <Tag className="mr-2 h-1 w-1" />
                  <p>{item.name} </p>
                </div>
                <div className="flex flex-between items-center">
                  <Users />
                  <p className="ml-2 text-muted-foreground">
                    {" "}
                    {item.memberCount}{" "}
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
