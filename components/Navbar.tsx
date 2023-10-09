import Link from "next/link";

import { navbarInfo } from "@/lib/data";

const Navbar = () => {
    return (
        <nav className="fixed w-72 h-full overflow-hidden transition bg-blue-500">
            <ul className="absolute top-0 left-0 w-full">
                {navbarInfo.map((item, key) => (
                    <li className="navbar-li group " key={key}>
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