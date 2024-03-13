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

const updateUserDetails= async (name:String,phoneNo:String,username:String)=>{
  const resp= await axios.post('http://localhost:8080/api/user/update',{
  username,
  phoneNo,
  name
  });
  console.log(resp);
}

const callAssignTags=async (tagName:String,username:String)=>{
  const resp= await axios.post('http://localhost:8080/api/user/assign',{
    username,
    tagName,
    type:"INDIVIDUAL"
  });
}


const callUnassignTags=async (tagName:String,username:String)=>{
  const resp= await axios.post('http://localhost:8080/api/user/unassign',{
    username,
    tagName,
    type:"INDIVIDUAL"
  });
}
export const ProfileEditModal = () => {
  const { viewedUser, currentUser, currentUserDetails,setCurrentUserDetails } = useAuthContext();
  const [name,setName]=useState("");
  const [phoneNo,setPhoneNo]=useState("");
  const [designation,setDesignation]=useState("");
  const [displayImg,setDisplayImg]=useState("");
  const profile = useProfileEdit();
  const [userTags,setUserTags]=useState(new Set());
  const [allTags,setAllTags]=useState([]);
  const [addTag,setAddTag]=useState(new Set());
  const [removeTag,setRemoveTag]=useState(new Set());

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    
    if (file) {
      const formData = new FormData();
      formData.append('displayImg', file);
      formData.append('username', currentUser);
      const {data} = await axios.post('http://localhost:8080/api/upload/display', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // console.log(res);
      setCurrentUserDetails({...currentUserDetails,displayImgUrl:data});
    }
  };



  const handleSaveChanges = async() => {
    var calls=[updateUserDetails(name,phoneNo,currentUser)]
    calls.push(Array.from(removeTag).map((tag:String)=>callUnassignTags(tag,currentUser)));
    calls.push(Array.from(addTag).map((tag:String)=>callAssignTags(tag,currentUser)));
    await Promise.all(calls);
    setCurrentUserDetails({...currentUserDetails,phoneNo,name});
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
  const handleAddTag = (tag:any) => {
    setAddTag((prevAddTag:any) => new Set([...prevAddTag, tag]));
    setRemoveTag((prevRemoveTag:any) => new Set([...prevRemoveTag].filter((t) => t !== tag)));
    setUserTags((prevUserTags:any) => new Set([...prevUserTags, tag]));
 

  };
  
  const handleRemoveTag = (tag:any) => {
    setRemoveTag((prevRemoveTag:any) => new Set([...prevRemoveTag, tag]));
    setAddTag((prevAddTag:any) => new Set([...prevAddTag].filter((t) => t !== tag)));
    setUserTags((prevUserTags:any) => new Set([...prevUserTags].filter((t) => t !== tag)));
  };
  

  useEffect(()=>{
    setDisplayImg(currentUserDetails.displayImgUrl);
    setName(currentUserDetails.name);
    setDesignation(currentUserDetails.designation);
    setPhoneNo(currentUserDetails.phoneNo);
    const tgs=currentUserDetails?.assignedTags?.map((e:any)=>e.name);
    setUserTags(new Set(tgs));
    (async ()=>{
      const respData=await fetchAllTags();
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
            { userTags  && Array.from(userTags).map((tag:any) => {
              return (<span
                key={tag}
                className={`tag  bg-green-500 text-white cursor-pointer py-1 px-3 rounded-full`}
                onClick={()=>handleRemoveTag(tag)}
              >
                {tag}
              </span>
              )
            })}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Add Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags && allTags.length && allTags.map((tag:any) => (
              <span
                key={tag}
                className={`tag bg-green-500 cursor-pointer py-1 px-3 rounded-full`}
                onClick={(e)=>handleAddTag(tag)}
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
