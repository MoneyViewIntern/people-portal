
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { Separator } from "../ui/seperator";
import { useProfileEdit } from "@/hooks/use-profile-edit";
import Image from 'next/image';
import { useState } from "react";

export const ProfileEditModal = () => {
  const profile = useProfileEdit();
  const [avatarProfilePic, setAvatarProfilePic] = useState('/images/emp2.jpeg');
  const [selectedTags, setSelectedTags] = useState([
    "apple", "banana", "orange", "grape", "kiwi", "pear", "pineapple", 
    "strawberry", "watermelon", "blueberry", "peach", "mango", "avocado"
  ]); // Initially selected tags
  const [userTags, setUserTags] = useState([
    "apple", "banana", "orange", "grape", "kiwi", "pear", "pineapple", 
    "strawberry", "watermelon", "blueberry", "peach", "mango", "avocado"
  ]);
  const universalTags = [
    "grape", "kiwi", "pear", "pineapple", "strawberry", "watermelon", 
    "blueberry", "peach", "mango", "avocado", "apple", "banana", "orange",
    "lemon", "lime", "cherry", "plum", "apricot", "papaya", "dragonfruit",
    "fig", "guava", "jackfruit", "kiwano", "lychee", "melon", "nectarine",
    "passion fruit", "persimmon", "pomegranate", "raspberry", "blackberry",
    "cranberry", "elderberry", "gooseberry", "kiwi", "starfruit", "tangerine",
    "mulberry", "boysenberry", "kumquat", "litchi", "rhubarb", "currant",
    "soursop", "barberry", "bilberry", "cloudberry", "huckleberry", "maracuya",
    "acai berry", "tamarillo", "ugli fruit", "longan", "sugar apple", "saskatoon",
    "durian", "tamarind", "ugli fruit", "loquat", "miracle fruit", "mangosteen",
    "rambutan", "salmonberry", "santol", "white currant", "wolfberry", "yuzu",
    "chico fruit", "carissa", "feijoa", "calabash", "melanberry", "ackee",
    "yumberry", "bearberry", "camu camu", "cupuacu", "granadilla", "jabuticaba",
    "pulasan", "salal berry", "tonka bean", "tibetan goji berry", "bignay",
    "jostaberry", "emerald apple", "lamington apple", "belmont apple", "willowleaf mandarin",
    "finger lime", "buddha's hand", "black sapote", "tree tomato", "tomatillo",
    "bilimbi", "quince", "chayote", "japanese raisin tree", "snake fruit",
    "american persimmon", "burdekin plum", "cherry plum", "cornelian cherry",
    "elephant apple", "feijoa", "gooseberry", "indian gooseberry", "hawthorn",
    "medlar", "saskatoon berry", "goumi", "goldenberry", "honeyberry",
    "arctic raspberry", "tayberry", "wineberry", "apricot", "pawpaw",
    "sapodilla", "sour cherry", "sweet cherry", "medlar", "white mulberry",
    "boysenberry", "juneberry", "redcurrant", "white currant", "blackcurrant",
    "gooseberry", "melon berry", "buffaloberry", "elderberry", "aronia berry",
    "bilberry", "mulberry", "red huckleberry", "snowberry", "cherry",
    "gooseberry", "feijoa", "loquat", "medlar", "pawpaw",
    "sapodilla", "sour cherry", "sweet cherry", "yew berry", "pomegranate",
    "bilberry", "cornelian cherry", "european dewberry", "tayberry", "blue honeysuckle",
    "honeyberry", "jostaberry", "melonberry", "currant", "clove currant",
    "gooseberry", "huckleberry", "saskatoon berry", "white currant", "redcurrant",
    "tayberry", "dewberry", "boysenberry", "loganberry", "youngberry",
    "black raspberry", "blackberry", "wineberry", "syrup berry", "cloudberry",
    "arctic bramble", "olallieberry", "raspberry", "boysenberry", "tayberry",
    "loganberry", "tummelberry", "wineberry", "black raspberry", "himalayan blackberry",
    "red raspberry", "arctic raspberry", "dewberry", "youngberry", "cloudberry",
    "apricot", "bilberry", "blackberry", "blackcurrant", "blueberry",
    "boysenberry", "breadfruit", "bunya nut", "cantaloupe", "cherry",
    "clementine", "cloudberry", "coconut", "date", "dragonfruit",
    "durian", "elderberry", "feijoa", "fig", "goji berry",
    "gooseberry", "grape", "guava", "honeydew", "jackfruit",
    "jambul", "jujube", "kiwano", "kiwifruit", "kumquat",
    "lemon", "lime", "longan", "loquat", "lychee",
    "mango", "mangosteen", "marionberry", "melon", "mulberry",
    "nectarine", "nut", "olive", "orange", "papaya",
    "passionfruit", "peach", "pear", "persimmon", "physalis",
    "pineapple", "plum", "pomegranate", "pomelo", "quince",
    "raisin", "rambutan", "raspberry", "redcurrant", "rock melon",
    "salak", "satsuma", "soursop", "star fruit", "strawberry",
    "tamarillo", "tamarind", "tangerine", "tomato", "ugli fruit",
    "watermelon", "white currant", "salmonberry", "santol", "bilberry",
    "wax jambu", "white currant", "white sapote", "yuzu", "amaranth",
    "balsam apple", "bilberry", "blackberry", "blueberry", "boysenberry",
    "breadfruit", "buffaloberry", "bush tomato", "cloudberry", "cranberry",
    "currant", "elderberry", "goji berry", "gooseberry", "grape",
    "huckleberry", "lingonberry", "loganberry", "marionberry", "mulberry",
    "nannyberry", "nectarine", "passionfruit", "peach", "pear",
    "persimmon", "plum", "raspberry", "salal berry", "salmonberry",
    "saskatoon berry", "sea buckthorn", "serviceberry", "strawberry", "bilberry",
    "tayberry", "thimbleberry", "watermelon berry", "wild peach", "wild strawberry"];
   // Universal tags

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarProfilePic(reader.result); // Update avatarProfilePic with the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    console.log("Profile picture has been changed.");
    console.log("User tags:", userTags);
    // Additional logic to save changes to user tags
  };

  const handleUserSpecificTagClick = (tag) => {
    if (!selectedTags.includes(tag)) return; // Do nothing if the tag is not present in user-specific tags
    const newTags = userTags.filter((t) => t !== tag); // Remove the tag from user-specific tags
    setUserTags(newTags);
    setSelectedTags(newTags);
  };

  const handlePossibleTagClick = (tag) => {
    if (userTags.includes(tag)) return; // Do nothing if the tag is already selected in user-specific tags
    const newTags = [...userTags, tag]; // Add the tag to user-specific tags
    setUserTags(newTags);
    setSelectedTags(newTags);
  };

  return (
    <Dialog open={profile.isOpen} onOpenChange={profile.onClose} className="max-w-5xl w-full">
      <DialogContent className="md:h-[90%] h-full w-full overflow-auto" >
        <DialogHeader className="flex items-center border-b pb-3">
          <h2 className="text-xl font-bold">Edit Profile</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div style={{ marginRight: '4vh' , marginLeft: '4vh'  }}>
            <Image
              src={avatarProfilePic}
              alt="Profile Pic"
              width={150}
              height={150}
              onClick={() => document.getElementById('profile-pic-input').click()}
              className="cursor-pointer rounded-full"
            />
          </div>
          <input type="file" onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" id="profile-pic-input" />
          <label htmlFor="profile-pic-input">
            <Button variant="icon" onClick={() => document.getElementById('profile-pic-input').click()}>
              <Pen size={20} />
            </Button>
          </label>
        </div>
        <Separator />
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Existing Tags</h3>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className={`tag ${tag.startsWith("-") ? 'bg-red-500' : 'bg-green-500'} text-white cursor-pointer py-1 px-3 rounded-full`}
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
                className={`tag ${userTags.includes(tag) ? 'bg-green-500' : 'bg-gray-300'} text-black cursor-pointer py-1 px-3 rounded-full`}
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