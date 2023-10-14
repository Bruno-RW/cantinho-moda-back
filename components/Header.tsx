
import NavbarButton from "./header/NavbarButton";
import Search from "./header/Search";
import UserAvatar from "./header/UserAvatar";

const Header = () => {
    return (
        // p-2 rounded-2xl
        <header className="flex items-center justify-between z-40 w-full h-14 transition-all">
            <NavbarButton />
            <Search />
            <UserAvatar />
        </header>
    );
}
export default Header;