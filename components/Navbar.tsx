"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { FaCrown } from "react-icons/fa";
import { BiArrowToLeft, BiArrowFromLeft } from "react-icons/bi";

import { useNavbar } from "@/context/NavbarContext";
import { navbarInfo } from "@/lib/data";

const Navbar = () => {
    const {isActive, toggleActive} = useNavbar();

    return (
        <>
            <nav className={twMerge("fixed w-72 h-full overflow-hidden transition-width bg-blue-500", isActive && "w-[60px] active")}>

                <div className="flex items-center gap-x-3.5 text-gray-50 font-medium mt-[18px] mb-8 ml-3.5 pointer-events-none">
                    <FaCrown size={28} />
                    <span className="pt-1 whitespace-nowrap">{isActive ? "" : "Cantinho da Moda"}</span>
                </div>

                <ul className="top-0 left-0 w-full">
                    {navbarInfo.map((item, key) => (
                        <li className={twMerge("navbar-li group", isActive && "hover:translate-x-0 hover:pl-2 hover:ml-2")} key={key}>
                            <Link className="flex items-center relative text-gray-50 w-full gap-x-3.5 py-3.5 no-underline group-hover:text-blue-500" href={item.url}>
                                <span className={twMerge("link-before absolute -top-[51px] right-[11px] content-[''] w-[50px] h-[50px] rounded-full pointer-events-none bg-transparent", isActive && "right-0")}></span>

                                <item.icon className="relative z-40" size={28} />
                                <span className="relative whitespace-nowrap">{isActive ? "" : item.label}</span>

                                <span className={twMerge("link-after absolute -bottom-[51px] right-[11px] content-[''] w-[50px] h-[50px] rounded-full pointer-events-none bg-transparent", isActive && "right-0")}></span>
                            </Link>
                        </li>
                    ))}
                </ul>
                
            </nav>

            <button className={twMerge("flex items-center justify-between absolute top-3.5 left-[300px] text-black/70 z-50 p-2 border rounded-full border-gray-200 bg-white transition-all hover:scale-110 focus:scale-110 active:scale-100", isActive && "left-[70px]")} onClick={() => toggleActive()}>
                {isActive ? (<BiArrowFromLeft size={25} />) : (<BiArrowToLeft size={25} />)}
            </button>
        </>
    );
}
export default Navbar;