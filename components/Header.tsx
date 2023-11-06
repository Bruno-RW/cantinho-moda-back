import NavbarButton from "@/components/header/NavbarButton";
import UserAvatar from "@/components/header/UserAvatar";
import Search from "@/components/header/Search";

const Header = () => {
  return (
    <header className="flex items-center justify-between z-40 w-full h-14 transition-all">
      <NavbarButton />
      <Search />
      <UserAvatar />
    </header>
  );
}
export default Header;