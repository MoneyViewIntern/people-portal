import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, DownloadCloudIcon } from "lucide-react";
import { useDownload } from "@/hooks/use-download";


// hi  i am jay

export const DownloadModal = () => {
  const download = useDownload(); // Use the useDownload hook

  const [downloadingFile, setDownloadingFile] = useState(null);

  const files = [
    { name: "File 1", url: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png" },
    { name: "File 2", url: "https://example.com/file2.pdf" },
    { name: "File 3", url: "https://example.com/file3.pdf" }
  ];

  const handleDownload = async (url : any) => {
    try {
      setDownloadingFile(url);
  
      const response = await fetch(url);
      const blob = await response.blob();
  
      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = url.split("/").pop(); // Extract filename from URL
      link.style.display = "none";
  
      // Add anchor element to the DOM and simulate click
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
  
      setDownloadingFile(null);
    } catch (error) {
      console.error("Error occurred while downloading file:", error);
      setDownloadingFile(null);
    }
  };
  

  return (
    <Dialog open={download.isOpen} onOpenChange={download.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Download</h2>
        </DialogHeader>
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
              <span className="text-base">{file.name}</span>
              <span className="text-[0.8rem] text-muted-foreground">File description goes here</span>
            </div>
            <Button onClick={() => handleDownload(file.url)} variant="ghost" size="icon">
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
