"use client";

import { BiArrowToLeft, BiArrowFromLeft } from "react-icons/bi";

import { useNavbar } from "@/context/NavbarContext";

const NavbarButton = () => {
    const {isActive, toggleActive} = useNavbar();

    return (
        <button className="bg-border text-center align-middle text-black/70 p-2 border rounded-full transition-all hover:scale-110 focus:scale-110 active:scale-100 dark:text-neutral-50" onClick={() => toggleActive()}>
            {isActive ? (<BiArrowFromLeft size={25} />) : (<BiArrowToLeft size={25} />)}
        </button>
    )
}
export default NavbarButton;