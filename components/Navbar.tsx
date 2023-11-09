"use client";

import Link from "next/link";
import { FaCrown } from "react-icons/fa";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import { navbarInfo } from "@/lib/data";
import { useNavbar } from "@/context/NavbarContext";

import Badge from "@/components/ui/Badge";

const Navbar = () => {
  const { isActive } = useNavbar();

  const onClick = (item: any) => { if (item.signOut) signOut() };

  return (
    <nav className={cn("w-72 h-screen overflow-hidden transition-all bg-blue-600 dark:bg-blue-500/80", isActive && "w-[60px] active")}>
      <div className="flex items-center gap-x-3.5 text-gray-50 font-medium mt-5 mb-8 ml-3.5 pointer-events-none dark:text-neutral-50">
        <FaCrown size={28} />
        <span className="pt-1 whitespace-nowrap">{isActive ? "" : "Cantinho da Moda"}</span>
      </div>

      <ul className="w-full">
        {navbarInfo.map((item, key) => (
          <li className={cn("navbar-li group", isActive && "hover:translate-x-0 hover:pl-2 hover:ml-2")} key={key} onClick={() => onClick(item)}>
            <Link className="flex items-center relative text-gray-50 w-full gap-x-3.5 py-3.5 no-underline group-hover:text-blue-600 dark:text-neutral-50 dark:group-hover:text-blue-500/80" href={item.url}>

              <span className={cn("link-before absolute -top-[51px] right-[11px] -z-50 content-[''] w-[50px] h-[50px] rounded-full pointer-events-none bg-transparent", isActive && "-right-[1px]")} />

              <item.icon className="relative" size={28} />
              {item.type === "M" ? (
                <span className="relative flex items-center justify-center whitespace-nowrap">
                  {isActive ? "" : (
                    <>
                      {item.label}
                      <Badge className="ml-2 group-hover:text-green-600 dark:group-hover:text-green-300" variant="green">Master</Badge>
                    </>
                  )}
                </span>
              ) : (
                <span className="relative whitespace-nowrap">{isActive ? "" : item.label}</span>
              )}

              <span className={cn("link-after absolute -bottom-[51px] right-[11px] -z-50 content-[''] w-[50px] h-[50px] rounded-full pointer-events-none bg-transparent", isActive && "-right-[1px]")} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default Navbar;