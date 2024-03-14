import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, DownloadCloudIcon } from "lucide-react";
import { useDownload } from "@/hooks/use-download";
import { useAuthContext } from "@/context/auth-context";


// hi  i am jay

export const DownloadModal = () => {
  const download = useDownload(); // Use the useDownload hook
  const {currentUserDetails}=useAuthContext();
  const [downloadingFile, setDownloadingFile] = useState(null);
  const [userFiles,setUserFiles]=useState([]);

  useEffect(()=>{
    setUserFiles(currentUserDetails.documents);
  })

  const handleDownload = async (file : any) => {
    const pdfUrl = file.url;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = file.name;
    link.target="_blank" // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <Dialog open={download.isOpen} onOpenChange={download.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Download</h2>
        </DialogHeader>
        {userFiles && userFiles.map((file:any, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
              <span className="text-base">{file.name}</span>
            </div>
            <Button onClick={()=>handleDownload(file)} variant="ghost" size="icon">
              {downloadingFile === file.url ? (
                <span className="text-sm"><DownloadCloudIcon /></span>
              ) : (
                <Download className="h-[1.2rem] w-[1.2rem] scale-100" />
              )}
            </Button>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};
