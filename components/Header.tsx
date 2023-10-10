import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import Search from "./Search";

const Header = () => {
    return (
        <header className="absolute left-[300px] w-full transition duration-200 bg-gray-50">
            <div className="topbar flex items-center justify-between w-full h-14 gap-x-2.5">
                <button className="toggle">
                    <HiOutlineMenuAlt2 size={28} />
                </button>

                <Search />
                
                <div className="user">

                </div>
            </div>
        </header>
    );
}
export default Header;