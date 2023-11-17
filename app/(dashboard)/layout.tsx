"use client";

import { useNavbar } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isActive } = useNavbar();
  
  return (
    <>
      <Navbar isActive={isActive} />
      <main className={cn("flex flex-col gap-y-3 py-2 pl-[272px] pr-3 w-full h-[200%] transition-all bg-gray-50 dark:bg-neutral-900", isActive && "pl-[72px]")}>
        <Header />
        <div className="flex flex-col gap-y-3 mx-5">{children}</div>
      </main>
    </>
  );
}
export default DashboardLayout;