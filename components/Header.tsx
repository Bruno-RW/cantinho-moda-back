"use client";

import { twMerge } from "tailwind-merge";

import { useNavbar } from "@/context/NavbarContext";

import Search from "./header/Search";
import UserAvatar from "./header/UserAvatar";

const Header = () => {
    const {isActive, toggleActive} = useNavbar();

    return (
        <header className={twMerge("flex items-center justify-between absolute left-96 w-full h-14 gap-x-2.5 transition-all bg-gray-50", isActive && "left-[150px]" )}>
            <Search />
            <UserAvatar />
        </header>
    );
}
export default Header;