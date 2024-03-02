import { Button } from "@/components/ui/button";
import Logo from "./logo";

const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 bg-background  dark:bg-[#1a1919] z-50">
      <Logo />
      <div
        className="flex items-center  w-full text-muted-foreground justify-between gap-x-2 
            md:ml-auto md:justify-end "
      >
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
