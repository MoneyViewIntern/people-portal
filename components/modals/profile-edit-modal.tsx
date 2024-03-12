import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { Separator } from "../ui/seperator";
import { useProfileEdit } from "@/hooks/use-profile-edit";
import Image from "next/image";
import { useState } from "react";

export const ProfileEditModal = () => {
  const profile = useProfileEdit();
  const [avatarProfilePic, setAvatarProfilePic] = useState("/images/emp2.jpeg");
  const [selectedTags, setSelectedTags] = useState([
    "apple",
    "banana",
    "orange",
    "grape",
    "kiwi",
    "pear",
    "pineapple",
    "strawberry",
    "watermelon",
    "blueberry",
    "peach",
    "mango",
    "avocado",
  ]); // Initially selected tags
  const [userTags, setUserTags] = useState([
    "apple",
    "banana",
    "orange",
    "grape",
    "kiwi",
    "pear",
    "pineapple",
    "strawberry",
    "watermelon",
    "blueberry",
    "peach",
    "mango",
    "avocado",
  ]);
  const universalTags = [
    "grape",
    "kiwi",
    "pear",
    "pineapple",
    "strawberry",
    "watermelon",
    "lemon",
    "saskatoon berry",
    "sea buckthorn",
    "serviceberry",
    "strawberry",
    "bilberry",
    "tayberry",
    "thimbleberry",
    "watermelon berry",
    "wild peach",
    "wild strawberry",
  ];

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarProfilePic(""); // Update avatarProfilePic with the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    console.log("Profile picture has been changed.");
    console.log("User tags:", userTags);
    // Additional logic to save changes to user tags
  };

  const handleUserSpecificTagClick = (tag: any) => {
    if (!selectedTags.includes(tag)) return; // Do nothing if the tag is not present in user-specific tags
    const newTags = userTags.filter((t) => t !== tag); // Remove the tag from user-specific tags
    setUserTags(newTags);
    setSelectedTags(newTags);
  };

  const handlePossibleTagClick = (tag: any) => {
    if (userTags.includes(tag)) return; // Do nothing if the tag is already selected in user-specific tags
    const newTags = [...userTags, tag]; // Add the tag to user-specific tags
    setUserTags(newTags);
    setSelectedTags(newTags);
  };

  return (
    <Dialog open={profile.isOpen} onOpenChange={profile.onClose}>
      <DialogContent className="md:h-[90%] h-full overflow-auto">
        <DialogHeader className="flex items-center border-b pb-3">
          <h2 className="text-xl font-bold">Edit Profile</h2>
        </DialogHeader>
        <div className="flex items-center justify-center relative">
  <img
    src={avatarProfilePic}
    onClick={() =>
      document?.getElementById("profile-pic-input")?.click()
    }
    className="cursor-pointer rounded-full w-32 h-32"
  />

  <input
    type="file"
    onChange={handleFileChange}
    style={{ display: "none" }}
    accept="image/*"
    id="profile-pic-input"
  />

  <label htmlFor="profile-pic-input" className="h-6 w-6">
    <div className="text-white absolute bottom-[9px] left-[155px] bg-primary/5 hover:bg-primary/50 h-32 w-32 p-5 rounded-full">
      <Pen className="h-20 w-20" onClick={() =>
        document?.getElementById("profile-pic-input")?.click()
      }/>
    </div>
   
  </label>
</div>

        <Separator />
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Existing Tags</h3>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className={`tag ${
                  tag.startsWith("-") ? "bg-red-500" : "bg-green-500"
                } text-white cursor-pointer py-1 px-3 rounded-full`}
                onClick={() => handleUserSpecificTagClick(tag.replace("-", ""))}
              >
                {tag.replace("-", "")}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Add Tags</h3>
          <div className="flex flex-wrap gap-2">
            {universalTags.map((tag) => (
              <span
                key={tag}
                className={`tag ${
                  userTags.includes(tag) ? "bg-green-500" : "bg-gray-300"
                } text-black cursor-pointer py-1 px-3 rounded-full`}
                onClick={() => handlePossibleTagClick(tag)}
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
