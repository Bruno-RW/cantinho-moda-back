import Link from "next/link";

import { navbarInfo } from "@/lib/data";

import { FaCrown } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="fixed w-72 h-full overflow-hidden transition bg-blue-500">
            <div className="flex items-center gap-x-3.5 py-3.5 text-gray-50 font-medium mb-8 ml-3.5 pointer-events-none">
                <FaCrown /><span>Cantinho da Moda</span>
            </div>

            <ul className="top-0 left-0 w-full">
                {navbarInfo.map((item, key) => (
                    <li className="navbar-li group" key={key}>
                        <Link className="navbar-link" href={item.url}>
                            <item.icon className="relative" size={25} />
                            <span className="relative whitespace-nowrap">{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
export default Navbar;