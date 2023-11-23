import { FaCrown } from "react-icons/fa";

import { cn } from "@/lib/utils";

import MappedRoutes from "@/components/navbar/MappedRoutes";

interface NavbarProps { isActive: boolean };

const Navbar: React.FC<NavbarProps> = ({ isActive }) => {
  return (
    <nav className={cn("fixed w-[260px] h-screen overflow-hidden transition-all bg-blue-600 dark:bg-blue-500/80", isActive && "w-[60px]")}>
      <div className="flex items-center gap-x-3.5 text-gray-50 font-medium mt-5 mb-8 ml-3.5 pointer-events-none dark:text-neutral-50">
        <FaCrown size={28} />
        <span className="pt-1 whitespace-nowrap">{isActive ? "" : "Cantinho da Moda"}</span>
      </div>

      <MappedRoutes isActive={isActive} />
    </nav>
  );
}
export default Navbar;