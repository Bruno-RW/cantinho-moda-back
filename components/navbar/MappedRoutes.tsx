import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";

import { navbarInfo } from "@/lib/data";
import { cn } from "@/lib/utils";

import Badge from "@/components/ui/custom/Badge";

interface MappedRoutesProps { isActive: boolean };

const MappedRoutes: React.FC<MappedRoutesProps> = ({ isActive }) => {
  const { data: session } = useSession();
  const isMaster = session?.user.type === "M";

  const onClick = (item: any) => {
    if (item.signOut) signOut();

    if (!isMaster && item.type === "M") toast.error("Unauthorized");
  };

  return (
    <ul className="w-full">
      {navbarInfo.map((item, key) => (
        <li className={cn("navbar-li group", isActive && "hover:translate-x-0 hover:pl-2 hover:ml-2")} key={key} onClick={() => onClick(item)}>
          <Link className="flex items-center relative text-gray-50 w-full gap-x-3.5 py-3.5 no-underline group-hover:text-blue-600 dark:text-neutral-50 dark:group-hover:text-blue-500/80" href={item.url}>

            <span className={cn("link-before absolute -top-[51px] right-[11px] -z-50 content-[''] w-[50px] h-[50px] rounded-full pointer-events-none bg-transparent", isActive && "-right-[1px]")} />

            <item.icon className="relative" size={28} />

            {item.type === "M" ? (
              <span className="relative flex items-center justify-center whitespace-nowrap">
                {isActive ? ("") : (
                  <>
                    {item.label}
                      
                    {isMaster ? (
                      <Badge className="ml-2 group-hover:text-green-600 dark:group-hover:text-green-300" variant="green">
                        Master
                      </Badge>
                    ) : (
                      <Badge className="ml-2 group-hover:text-red-600 dark:group-hover:text-red-300" variant="red">
                        Master
                      </Badge>
                    )}
                  </>
                )}
              </span>
            ) : (
              <span className="relative whitespace-nowrap">
                {isActive ? "" : item.label}
              </span>
            )}

            <span className={cn("link-after absolute -bottom-[51px] right-[11px] -z-50 content-[''] w-[50px] h-[50px] rounded-full pointer-events-none bg-transparent", isActive && "-right-[1px]")} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default MappedRoutes;