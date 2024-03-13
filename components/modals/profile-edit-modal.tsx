import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { Separator } from "../ui/seperator";
import { useProfileEdit } from "@/hooks/use-profile-edit";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProfileItem from "../profile-item";
import { useAuthContext } from "@/context/auth-context";
import axios from "axios";
import { toast } from "sonner";
import { PROFILE_IMAGE_URL } from "@/Constants/constants";


const fetchAllTags=async ()=>{
  const {data}=await axios.get('http://localhost:8080/api/tags/individual');

  return data;
}


export const ProfileEditModal = () => {
  const { viewedUser, currentUser, currentUserDetails } = useAuthContext();
  const [name,setName]=useState("");
  const [phoneNo,setPhoneNo]=useState("");
  const [designation,setDesignation]=useState("");
  const [displayImg,setDisplayImg]=useState("");
  const profile = useProfileEdit();
  const [userTags,setUserTags]=useState([]);
  const [allTags,setAllTags]=useState([]);
  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    
    if (file) {
      const formData = new FormData();
      formData.append('displayImg', file);
      formData.append('username', currentUser);
      const res = await axios.post('http://localhost:8080/api/upload/display', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res);
    }
  };

  const handleSaveChanges = () => {
    console.log("Profile picture has been changed.");
    console.log("User tags:", userTags);
    console.log("Current User Details are");
    console.log(currentUserDetails);

    // Additional logic to save changes to user tags
  };

  // const handleUserSpecificTagClick = (tag: any) => {
  //   if (!selectedTags.includes(tag)) return; // Do nothing if the tag is not present in user-specific tags
  //   const newTags = userTags.filter((t) => t !== tag); // Remove the tag from user-specific tags
  //   setUserTags(newTags);
  //   setSelectedTags(newTags);
  // };

  // const handlePossibleTagClick = (tag: any) => {
  //   if (userTags.includes(tag)) return; // Do nothing if the tag is already selected in user-specific tags
  //   const newTags = [...userTags, tag]; // Add the tag to user-specific tags
  //   setUserTags(newTags);
  //   setSelectedTags(newTags);
  // };

  useEffect(()=>{
    setDisplayImg(currentUserDetails.displayImgUrl);
    setName(currentUserDetails.name);
    setDesignation(currentUserDetails.designation);
    setPhoneNo(currentUserDetails.phoneNo);
    setUserTags(currentUserDetails.assignedTags);
    (async ()=>{
      const respData=await fetchAllTags();
      console.log(respData);
      setAllTags(respData);
      })();
  },[currentUserDetails])
 
  return (
    <Dialog open={profile.isOpen} onOpenChange={profile.onClose}>
      <DialogContent className="md:h-[90%] h-full overflow-auto">
        <DialogHeader className="flex items-center border-b pb-3">
          <h2 className="text-xl font-bold">Edit Profile</h2>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <img src={displayImg || PROFILE_IMAGE_URL} className=" rounded-full w-32 h-32" />

          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*"
            id="profile-pic-input"
          />

          <label
            htmlFor="profile-pic-input"
            className="flex mt-[20%] h-12 w-12"
          >
            <div className="flex items-center justify-center hover:cursor-pointer bg-primary/5 hover:bg-primary/20 h-12 w-12 rounded-full">
              <Pen />
            </div>
          </label>
        </div>
        <Separator />

        <ProfileItem
          name="Name"
          description="What should we call you?"
          value={name || "xyz"}
          isEditable={true}
          onChange={setName}
        />

        <ProfileItem
          name="Phone Number"
          description="Your Personal Numbers"
          value={phoneNo || "xyz"}
          isEditable={true}
          onChange={setPhoneNo}
        />
        
        <ProfileItem
          name="Designation"
          description="Your Role"
          value={designation || "xyz"}
          isEditable={false}
        />
        

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Existing Tags</h3>
          <div className="flex flex-wrap gap-2">
            {userTags && userTags.length && userTags.map((tag:any) => (
              <span
                key={tag.name}
                className={`tag  bg-green-500 text-white cursor-pointer py-1 px-3 rounded-full`}
               
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Add Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags && allTags.length && allTags.map((tag:any) => (
              <span
                key={tag}
                className={`tag bg-green-500 text-black cursor-pointer py-1 px-3 rounded-full`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
