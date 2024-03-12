import { ClipboardCopy, ClipboardPlus, Pen } from "lucide-react";
import React, { use, useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";



interface EmployeeDetailItemProps {
  label: string;
  value: string;
}

// Reusable UI component to display each employee detail
const EmployeeDetailItem = ({ label, value }: EmployeeDetailItemProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Item Copied!");
    setTimeout(() => setCopied(false), 1000); // Reset copied state after 1 second
  };

  return (
    <div className="flex flex-col gap-y-4 pt-6  p-1">
      <div className="flex justify-between">
        <div>
          <div className=" text-md text-muted-foreground font-semibold">
            {label}
          </div>
          <div className="text-sm">{value}</div>
        </div>
        <div className="mr-4 text-muted-foreground">
          {!copied ? (
            <ClipboardCopy
              className="hover:cursor-pointer hover:text-[#0B8C4C]"
              onClick={handleCopy}
            />
          ) : (
            <ClipboardPlus className="hover:text-[#0B8C4C]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default function EmployeeDetails({empDetails}:{
  empDetails:any
}) {
  const [showData,setShowData]=useState({});

  useEffect(()=>{
    const newObj={
      "Username":empDetails.username,
      "Email":empDetails.email,
      "Name":empDetails.name,
      "Designation":empDetails.designation,
      "Level":empDetails.level
    }

    setShowData(newObj);
  },[empDetails])
  return (
    <main className=" pl-4">
      {showData && Object.entries(showData).map(([label, value], index) => (
        <EmployeeDetailItem key={index} label={label} value={value} />
      ))}
    </main>
  );
}
