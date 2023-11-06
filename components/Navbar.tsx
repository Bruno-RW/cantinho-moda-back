"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { FaCrown } from "react-icons/fa";

import { useNavbar } from "@/context/NavbarContext";
import { navbarInfo } from "@/lib/data";

const Navbar = () => {
  const { isActive } = useNavbar();

  return (
    <nav className={twMerge("w-72 h-screen overflow-hidden transition-all bg-blue-600 dark:bg-blue-500/80", isActive && "w-[60px] active")}>
      <div className="flex items-center gap-x-3.5 text-gray-50 font-medium mt-5 mb-8 ml-3.5 pointer-events-none dark:text-neutral-50">
        <FaCrown size={28} />
        <span className="pt-1 whitespace-nowrap">{isActive ? "" : "Cantinho da Moda"}</span>
      </div>

      <ul className="w-full">
        {navbarInfo.map((item, key) => (
          <li className={twMerge("navbar-li group", isActive && "hover:translate-x-0 hover:pl-2 hover:ml-2")} key={key}>
            <Link className="flex items-center relative text-gray-50 w-full gap-x-3.5 py-3.5 no-underline group-hover:text-blue-600 dark:text-neutral-50 dark:group-hover:text-blue-500/80" href={item.url}>

              <span className={twMerge("link-before absolute -top-[51px] right-[11px] content-[''] w-[50px] h-[50px] rounded-full pointer-events-none bg-transparent", isActive && "-right-[1px]")} />

              <item.icon className="relative z-40" size={28} />
              <span className="relative whitespace-nowrap">{isActive ? "" : item.label}</span>

              <span className={twMerge("link-after absolute -bottom-[51px] right-[11px] content-[''] w-[50px] h-[50px] rounded-full pointer-events-none bg-transparent", isActive && "-right-[1px]")} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default Navbar;