"use client";

import Image from "next/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { useTheme } from "@/context/ThemeContext";

const UserAvatar = () => {
  const userProviderImg = null;
  const { theme, toggleTheme } = useTheme();

  return (
    <Dropdown>
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center">
          {userProviderImg ? (
            <Image
              src="/public/pfp.png"
              width={25}
              height={25}
              alt="Profile image"
            />
          ) : (
            <div className="py-2 px-2.5 rounded-full bg-gray-300 dark:bg-neutral-600">
              <span className="text-sm">BW</span> {/*3 or 2 letters name */}
            </div>
          )}
        </div>
      </DropdownTrigger>

      <DropdownMenu aria-label="Static Actions">
        <DropdownItem className="flex" onClick={toggleTheme} key="tema">
          Modo: {theme === "dark" ? "escuro" : "claro"}
        </DropdownItem>

        <DropdownItem key="settings">Settings</DropdownItem>

        <DropdownItem className="text-danger" color="danger" key="log-out">Log out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
export default UserAvatar;