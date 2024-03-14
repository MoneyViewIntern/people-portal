import { useState, useEffect } from "react";
import { useDownload } from "@/hooks/use-download";
import { Download, Mail, Phone, Slack ,FileText} from "lucide-react";
import { useAuthContext } from "@/context/auth-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import axios from "axios";
interface EmployeeProfilePicProps {
  defaultPfp: any;
  avatarPfp: any;
  phoneNo:any;
  slackId:any;
  email : any;
}



function convertArrayOfObjectsToCSV(data:any) {
  const header = Object.keys(data[0]).filter(key => ['email','name','username', 'designation', 'level', 'phoneNo', 'slackId'].includes(key));
  
  const csv = [
      header.join(','),
      ...data.map((row:any) => header.map(fieldName => JSON.stringify(row[fieldName])).join(','))
  ].join('\n');

  return csv;
}

function downloadCSV(data:any, filename:any) {
  const csv = convertArrayOfObjectsToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const handleReporteeDownload=async (username:any)=>{
  const {data}=await axios.get(`http://localhost:8080/api/user/reportee/${username}`);
  downloadCSV(data,username);
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
          src={selectedImage === "default" ? defaultPfp : (avatarPfp || avatarPofilePic)}
          onClick={handleProfilePicClick}
          className="h-[7rem] w-[7rem] cursor-pointer object-cover rounded-full"
        />
      </div>
        <div className="flex items-center justify-center mt-6">
            <div className="flex gap-x-5">

          <Download className=" m-2 hover:text-[#0B8C4C]" onClick={()=>handleReporteeDownload(viewedUser)}/>
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
          <FileText
            onClick={handleDownload}
            className={cn("m-2", canDownload && "hover:text-[#0B8C4C] hover:cursor-pointer", !canDownload && "text-muted-foreground hover:cursor-not-allowed")}
          />
          </a>
            </div>
        </div>
     
    </main>
  );
}
