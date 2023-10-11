"use client";

import { twMerge } from "tailwind-merge";

import { BiArrowToLeft, BiArrowFromLeft } from "react-icons/bi";

import { useNavbar } from "@/context/NavbarContext";

import Search from "./header/Search";
import UserAvatar from "./header/UserAvatar";

const Header = () => {
    const {isActive, toggleActive} = useNavbar();

    return (
        <header className={twMerge("flex items-center justify-between z-40 w-full h-14 transition-all bg-gray-50")}>
            
            <button className="text-center align-middle text-black/70 p-2 border rounded-full border-gray-200 bg-white shadow-lg backdrop-blur-xl backdrop-saturate-200 transition-all hover:scale-110 focus:scale-110 active:scale-100" onClick={() => toggleActive()}>
                {isActive ? (<BiArrowFromLeft size={25} />) : (<BiArrowToLeft size={25} />)}
            </button>

            <Search />
            <UserAvatar />
        </header>
    );
}
export default Header;