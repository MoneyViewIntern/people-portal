import Navbar from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <Navbar />
      <main className="h-full pt-40  dark:bg-[#1a1919]">{children}</main>
    </div>
  );
};

export default MarketingLayout;
