import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRightFromLine, Download, DownloadCloudIcon, UserRoundSearch } from "lucide-react";
import { useTagSearch } from "@/hooks/use-tag-search";
import { Label } from "../ui/label";
import { useAuthContext } from "@/context/auth-context";
import axios from "axios";
import { useRouter } from "next/navigation";



//change api route to get user array
const fetchUserList = async (tag_name : string)=>{
  const resp = await axios.get(`http://localhost:8080/api/tags/${tag_name}`);
  console.log(resp);
  return resp.data;
}

export const SearchTagModal = () => {
  const tagSearch = useTagSearch(); 
  const {selectedTag, setViewedUser}= useAuthContext();
  const [relatedUsers, setRelatedUsers] = useState([]);
  const router = useRouter();
// fetch user list at mnt
  useEffect(() => {
    if (selectedTag)
    (async () => {
      const userData = await fetchUserList(selectedTag.name);
      console.log(userData);
      setRelatedUsers(userData);
    })();
  }, [selectedTag]);


  const handleSelect = (item: any) => {
    console.log("TAG USER CLICKED");
    console.log(item);
    setViewedUser(item.username);
    router.push(`/user/${item.username}`)
    tagSearch.onClose();
    setViewedUser((prevUser) => {
      console.log(`Viewed user : ${prevUser}`);
      return item.username;
    });
  };

  return (
    <Dialog open={tagSearch.isOpen} onOpenChange={tagSearch.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">{selectedTag.name} </h2>
          <h4 className="text-sm font-small">Associated Employee </h4>
        </DialogHeader>
        {relatedUsers?.map((user: any) => (
            
            <div key={user.username} className="flex items-center justify-between">
              <div className="flex flex-col gap-y-1">
                <Label>{user.name}</Label>
                <span className="text-[0.8rem] text-muted-foreground">
                  @{user.username}
                </span>
              </div>
              <Button onClick={()=>handleSelect(user)} variant="ghost" size="icon">
                  <ArrowRightFromLine className="h-[1.2rem] w-[1.2rem] scale-100" />
              </Button>
            </div>
              ))}
      </DialogContent>
    </Dialog>
  );
};
