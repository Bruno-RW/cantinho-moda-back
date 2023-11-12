"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

import { cn } from "@/lib/utils";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathList = pathname.split("/").filter(path => path !== "");

  const linkStyles = "text-lg text-black/50 dark:text-white/50 hover:underline";
  const currentLinkStyles = "text-lg text-black cursor-default hover:no-underline dark:text-gray-50";

  return (
    <div className="flex items-center gap-x-1.5 ml-2">
      <Link className={cn(linkStyles, pathname === "/" && currentLinkStyles)} href={`${origin}/`}>
        Home
      </Link>

      {pathList.map((item, key) => 
        <>
          <IoIosArrowForward className={linkStyles} size={20} />

          <Link className={cn(linkStyles, pathList[pathList.length - 1] === item && currentLinkStyles)} href={`${origin}/${item}`} key={key}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Link>
        </>
      )}
    </div>
  );
}
export default Breadcrumbs;