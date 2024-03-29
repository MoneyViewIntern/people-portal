"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";
interface ItemProps {
  isSearch?: boolean;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
}

const Item = ({ label, onClick, icon: Icon, isSearch }: ItemProps) => {
  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: "12px" }}
      className={
        "rounded-full select-none group min-h-[12px] text-md py-3 pr-1 w-full flex items-center text-muted-foreground font-medium  hover:bg-primary/5"
      }
    >
      <Icon className="shrink-0 h-[20px] w-[20px] mr-2 text-muted-foreground" />
      <span className="truncate">{label}</span>
    </div>
  );
};

export default Item;

Item.Skeleton = function ItemSkeleton() {
  return (
    <div
      style={{ paddingLeft: "12px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
