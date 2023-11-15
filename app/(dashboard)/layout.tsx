"use client";

import toast from "react-hot-toast";

import { useNavbar } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isActive } = useNavbar();
  toast.remove();
  
  return (
    <>
      <Navbar isActive={isActive} />
      <main className={cn("flex flex-col gap-y-3 my-2 ml-[300px] mr-3 w-full transition-all", isActive && "ml-[72px]")}>
        <Header />
        <section className="flex flex-col gap-y-3 mx-5">{children}</section>
      </main>
    </>
  );
}
export default DashboardLayout;