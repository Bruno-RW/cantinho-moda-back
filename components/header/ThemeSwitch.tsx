"use client";

import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useTheme } from "@/context/ThemeContext";

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex items-center space-x-2" onClick={toggleTheme}>
            uva
        </div>
    );
}
export default ThemeSwitch; 