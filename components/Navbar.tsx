"use client";

import { FaCrown } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { useNavbar } from "@/context/NavbarContext";

import MappedRoutes from "@/components/navbar/MappedRoutes";

const Navbar = () => {
  const { isActive } = useNavbar();

  return (
    <nav className={cn("w-72 h-screen overflow-hidden transition-all bg-blue-600 dark:bg-blue-500/80", isActive && "w-[60px] active")}>
      <div className="flex items-center gap-x-3.5 text-gray-50 font-medium mt-5 mb-8 ml-3.5 pointer-events-none dark:text-neutral-50">
        <FaCrown size={28} />
        <span className="pt-1 whitespace-nowrap">{isActive ? "" : "Cantinho da Moda"}</span>
      </div>

      <MappedRoutes isActive={isActive} />
    </nav>
  );
}
export default Navbar;