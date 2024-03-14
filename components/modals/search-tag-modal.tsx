import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRightFromLine, Download, DownloadCloudIcon, UserRoundSearch } from "lucide-react";
import { useTagSearch } from "@/hooks/use-tag-search";
import { Label } from "../ui/label";

const fetchAssociatedEmployee=async ()=>{

}

export const SearchTagModal = () => {
  const tagSearch = useTagSearch(); 

  const[associated,SetAssociated]=useState([]);

  return (
    <Dialog open={tagSearch.isOpen} onOpenChange={tagSearch.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Associated Employees</h2>
        </DialogHeader>
        {associated.map((user:any)=>
           <div className="flex items-center justify-between">
           <div className="flex flex-col gap-y-1">
             <Label>{user.name}</Label>
             <span className="text-[0.8rem] text-muted-foreground">
               {user.username}
             </span>
           </div>
           <a href={`/user/${user.username}`}>
           <Button variant="ghost" size="icon">
               <ArrowRightFromLine className="h-[1.2rem] w-[1.2rem] scale-100" />
           </Button>
           </a>
         </div>
        )
        }
       
      </DialogContent>
    </Dialog>
  );
};
