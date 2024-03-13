import { useState, useEffect } from "react";
import { useDownload } from "@/hooks/use-download";
import { Download, Mail, Phone, Slack } from "lucide-react";
import { useAuthContext } from "@/context/auth-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
interface EmployeeProfilePicProps {
  defaultPfp: any;
  avatarPfp: any;
  phoneNo:any;
  slackId:any;
  email : any;
}
export default function EmployeeProfilePic({
  defaultPfp,
  avatarPfp,
  phoneNo,
  slackId,
  email,
}: EmployeeProfilePicProps) {
  const [selectedImage, setSelectedImage] = useState("default");
  const [avatarPofilePic, setAvatarPofilePic] = useState(avatarPfp);
  const [userSwitched, setUserSwitched] = useState(false);
  const {viewedUser, currentUser} = useAuthContext();
  const [canDownload, setCanDownload]=useState(true);  // true when condition met
  const download = useDownload();
  const handleDownload = ()=>{
    if(viewedUser===currentUser) {
      setCanDownload(true);
      download.onOpen();
    }
    else{
      setCanDownload(false);
      toast.error("You are not authorized to download other user's resources")
    } 
  }

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
          <a
            href={`mailto:${email}`}
            target="_blank"
          >
            <Mail className=" m-2 hover:text-[#0B8C4C]" />
          </a>
          <a> 
          <Download
            onClick={handleDownload}
            className={cn("m-2", canDownload && "hover:text-[#0B8C4C] hover:cursor-pointer", !canDownload && "text-muted-foreground hover:cursor-not-allowed")}
          />
          </a>
            </div>
        </div>
     
    </main>
  );
}
