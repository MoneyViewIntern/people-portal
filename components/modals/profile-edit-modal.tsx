import { Dialog, DialogContent, DialogHeader,DialogFooter } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { Separator } from "../ui/seperator";
import { useProfileEdit } from "@/hooks/use-profile-edit";
import Image from 'next/image';
import { useState } from "react";

export const ProfileEditModal = ({ onSave }) => {
  const profile = useProfileEdit();

  const [avatarProfilePic, setAvatarProfilePic] = useState('/images/emp2.jpeg');
  const [userTags, setUserTags] = useState([
    "apple", "banana", "orange", "grape", "kiwi", "pear", "pineapple",
    "strawberry", "watermelon", "blueberry", "peach", "mango", "avocado"
  ]);
  const [universalTags,setUniversityTags] = useState([
    "grape", "kiwi", "pear", "pineapple", "strawberry", "watermelon", 
    "blueberry", "peach", "mango", "avocado", "apple", "banana", "orange",
    "lemon", "lime", "cherry", "plum", "apricot", "papaya", "dragonfruit",
    "fig", "guava", "jackfruit", "kiwano", "lychee", "melon", "nectarine",
    "passion fruit", "persimmon", "pomegranate", "raspberry",
    "cranberry", "elderberry", "gooseberry", "starfruit", "tangerine",
    "mulberry", "boysenberry", "kumquat", "litchi", "rhubarb", "currant",
    "soursop", "barberry", "bilberry", "cloudberry", "huckleberry", "maracuya",
    "acai berry", "tamarillo", "ugli fruit", "longan", "sugar apple", "saskatoon",
    "durian", "tamarind", "loquat", "miracle fruit", "mangosteen",
    "rambutan", "salmonberry", "santol", "white currant", "wolfberry", "yuzu",
    "chico fruit", "carissa", "feijoa", "calabash", "melanberry", "ackee",
    "yumberry", "bearberry", "camu camu", "cupuacu", "granadilla", "jabuticaba",
    "pulasan", "salal berry", "tonka bean", "tibetan goji berry", "bignay",
    "jostaberry", "emerald apple", "lamington apple", "belmont apple", "willowleaf mandarin",
    "finger lime", "buddha's hand", "black sapote", "tree tomato", "tomatillo",
    "bilimbi", "quince", "chayote", "japanese raisin tree", "snake fruit",
    "american persimmon", "burdekin plum", "cherry plum", "cornelian cherry",
    "elephant apple", "hawthorn", "medlar", "goumi", "goldenberry", "honeyberry",
    "arctic raspberry", "tayberry", "wineberry", "pawpaw", "sapodilla",
    "sour cherry", "sweet cherry", "white mulberry", "juneberry", "redcurrant",
    "buffaloberry", "aronia berry", "snowberry", "goji berry",
    "melon berry", "yew berry", "european dewberry", "blue honeysuckle",
    "clove currant", "indian", "himalayan", "rock melon",
    "satsuma", "physalis", "pomelo", "raisin", "salak",
    "wax jambu", "white sapote", "amaranth", "balsam apple", "bush tomato",
    "lingonberry", "nannyberry", "sea buckthorn", "serviceberry", "thimbleberry",
    "wild peach"
]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    onSave({
      avatarProfilePic: avatarProfilePic,
      userTags: userTags
    });
  };

  const handleTagClick = (tag) => {
    const newTags = userTags.includes(tag)
      ? userTags.filter((t) => t !== tag)
      : [...userTags, tag];
    setUserTags(newTags);
  };

  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredTags = searchValue
    ? universalTags.filter((tag) => tag.toLowerCase().startsWith(searchValue.toLowerCase()))
    : [];

  const [newTag, setNewTag] = useState(""); // State for the new tag input

  const handleAddNewTag = () => {
    if (newTag.trim() !== "") { // Check if the new tag input is not empty
      if (!userTags.includes(newTag)) { // Check if the new tag is not already in userTags
        setUserTags([...userTags, newTag]); // Add the new tag to userTags
        if (!universalTags.includes(newTag)) { // Check if the new tag is not already in universalTags
          setUniversityTags([...universalTags, newTag]); // Add the new tag to universalTags
        }
        setNewTag(""); // Clear the new tag input
      }
    }
  };

  const handleNewTagChange = (event) => {
    setNewTag(event.target.value); // Update the new tag input value
  };


  return (
    <Dialog open={profile.isOpen} onOpenChange={profile.onClose}>
      <DialogContent className="md:h-[90%] h-full w-full overflow-auto">
        <DialogHeader className="flex items-center border-b pb-1">
          <h2 className="text-xl font-bold">Edit Profile</h2>
        </DialogHeader>

        <div className="flex items-center justify-between">
          <div style={{ position: 'relative', marginRight: '4vh', marginLeft: '4vh', border: '3px solid gray', borderRadius: '20px' }}>
            <Image
              src={avatarProfilePic}
              alt="Profile Pic"
              width={150}
              height={150}
              onClick={() => document.getElementById('profile-pic-input').click()}
              className="cursor-pointer"
              style={{ borderRadius: '17px', overflow: 'hidden', padding: "1" }}
            />
            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" id="profile-pic-input" />
            <label htmlFor="profile-pic-input" style={{ position: 'absolute', bottom: '-14px', right: '-34px' }}>
              <Button variant="icon" onClick={() => document.getElementById('profile-pic-input').click()}>
                <Pen size={20} />
              </Button>
            </label>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </div>


        <Separator />

        <div className="mt-1">
          <h3 className="text-lg font-bold mb-2">User Tags <span className="text-sm font-semi-bold">(click to remove)</span></h3>
          <div className="flex flex-wrap gap-2">
            {userTags.map((tag) => (
              <span
                key={tag}
                className="tag bg-green-500 text-white cursor-pointer py-1 px-3 rounded-full"
                onClick={() => handleTagClick(tag)}
                style={{ borderRadius: '20px',
                border: '1px solid #1f1f1f' // Dark border color
              }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <Separator />

        <div className="mt-2">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            Add Tags
            <span className="text-sm font-semi-bold px-1">(click to add)</span>
            <span className="flex-grow"></span>
            <span>
              <input
                type="text"
                placeholder="search tags"
                className="border border-gray-300 font-normal px-2 py-1 rounded-md focus:outline-none focus:border-blue-500 h-7"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {filteredTags.map((tag) => (
              <span
                key={tag}
                className={`tag ${userTags.includes(tag) ? 'bg-green-500' : 'bg-gray-300'} text-white cursor-pointer py-1 px-3 rounded-full`}
                onClick={() => handleTagClick(tag)}
                style={{ borderRadius: '20px',
                border: '1px solid #1f1f1f' // Dark border color
              }}
              >
                {tag}
              </span>
            ))}
            {searchValue && filteredTags.length === 0 && (
              <span className="text-sm text-gray-500">No matching tags found</span>
            )}
            {searchValue === "" && universalTags.map((tag) => (
              <span
                key={tag}
                className={`tag ${userTags.includes(tag) ? 'bg-green-500' : 'bg-gray-300'} text-white cursor-pointer py-1 px-3 rounded-full`}
                onClick={() => handleTagClick(tag)}
                style={{ borderRadius: '20px',
                border: '1px solid #1f1f1f' // Dark border color
              }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <Separator/>
        
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-bold mr-2">Add Custom Tags</h3>
          <span className="text-sm text-gray-500">(add your own tags)</span>
          <div className="flex-grow"></div>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Enter new tag"
            className="border border-gray-300 font-normal px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 mr-2"
            value={newTag}
            onChange={handleNewTagChange}
          />
          <Button onClick={handleAddNewTag} variant="primary">Add</Button>
        </div>
        <div className="flex justify-center mt-6">
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};



          