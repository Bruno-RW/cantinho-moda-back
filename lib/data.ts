import { HiOutlineHome } from "react-icons/hi";
import { BsDiagram3, BsBookmarks } from "react-icons/bs";
import { AiOutlineTags } from "react-icons/ai";
import { LiaUserShieldSolid } from "react-icons/lia";
import { BiStore } from "react-icons/bi";
import { PiGearSix } from "react-icons/pi";
import { FiUsers, FiLogOut } from "react-icons/fi";

export const navbarInfo = [
    {
        label: "Dashboard",
        url: "/dashboard",
        icon: HiOutlineHome
    },
    {
        label: "Categories",
        url: "/categories",
        icon: BsDiagram3
    },
    {
        label: "Brands",
        url: "/brands",
        icon: BsBookmarks
    },
    {
        label: "Products",
        url: "/products",
        icon: AiOutlineTags
    },
    {
        label: "Clients",
        url: "/clients",
        icon: FiUsers
    },
    {
        label: "Users",
        url: "/users",
        icon: LiaUserShieldSolid
    },
    {
        label: "Companies",
        url: "/companies",
        icon: BiStore
    }, 
    {
        label: "Settings",
        url: "/settings",
        icon: PiGearSix
    }, 
    {
        label: "Log Out",
        url: "/logout",
        icon: FiLogOut
    }, 
] as const;