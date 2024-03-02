"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SidebarItem = () => {
  return (
    <div className=" h-full w-full">
      <Card className=" m-3 dark:bg-[#1a1919]">
        <CardHeader className="flex items-center justify-center">
          <CardTitle>User Card</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
    </div>
  );
};
export default SidebarItem;
