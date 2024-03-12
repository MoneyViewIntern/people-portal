import { useState, useEffect } from "react";
import { useDownload } from "@/hooks/use-download";
import { Download, Phone, Slack } from "lucide-react";
interface EmployeeProfilePicProps {
  defaultPfp: any;
  avatarPfp: any;
  phoneNo:any;
  slackId:any;
}
export default function EmployeeProfilePic({
  defaultPfp,
  avatarPfp,
  phoneNo,
  slackId
}: EmployeeProfilePicProps) {
  const [selectedImage, setSelectedImage] = useState("default");
  const [avatarPofilePic, setAvatarPofilePic] = useState(avatarPfp);
  const [currentUser, setCurrentUser] = useState("jay");
  const [userSwitched, setUserSwitched] = useState(false);

  const handleDownload = useDownload().onOpen;

  useEffect(() => {
    const switchToAvatar = setTimeout(() => {
      if (!userSwitched) {
        setSelectedImage("avatar");
      }
    }, 100);

    const switchToDefault = setTimeout(() => {
      if (!userSwitched) {
        setSelectedImage("default");
      }
    }, 100);

    return () => {
      clearTimeout(switchToAvatar);
      clearTimeout(switchToDefault);
    };
  }, [userSwitched]);

  const toggleImage = () => {
    setSelectedImage(selectedImage === "default" ? "avatar" : "default");
    setUserSwitched(true);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPofilePic(reader.result);
      };
      reader.readAsDataURL(file);
      setUserSwitched(true);
    }
  };

  const handleProfilePicClick = () => {
    if (avatarPofilePic) {
      toggleImage();
    }
  };

  let name = "Arihant";

  return (
    <main className="flex flex-col">
      <div className="mx-auto">
        <img
          src={selectedImage === "default" ? defaultPfp : avatarPofilePic}
          onClick={handleProfilePicClick}
          className="h-[7rem] w-[7rem] cursor-pointer object-cover rounded-full"
        />
      </div>
        <div className="flex items-center justify-center mt-6">
            <div className="flex gap-x-5">

          <a
            href={`slack://open?id=${slackId}`}
            target="_blank"
          >
            <Slack className=" m-2 hover:text-[#0B8C4C]" />
          </a>

          <a href={`tel:+91-${phoneNo}`}>
            <Phone className=" m-2 hover:text-[#0B8C4C]" />
          </a>
          <a className="hover:cursor-pointer"> 
          <Download
            onClick={handleDownload}
            className="m-2 hover:text-[#0B8C4C]"
          />
          </a>
            </div>
        </div>
     
    </main>
  );
}
