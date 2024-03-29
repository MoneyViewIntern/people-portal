import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="images/logo.svg"
        height="50"
        width="50"
        className="dark:hidden"
        alt="Logo"
      />
      <Image
        src="images/logo-dark.svg"
        height="50"
        width="50"
        className="hidden dark:block filter grayscale"
        alt="Logo"
      />
      <p className={cn("font-bold", font.className)}>PeoplePortal</p>
    </div>
  );
};

export default Logo;
