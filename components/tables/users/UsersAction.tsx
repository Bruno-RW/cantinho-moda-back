"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

import { useTheme } from "@/context/ThemeContext";

import { Tooltip } from "@nextui-org/react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import AlertModal from "@/components/modals/AlertModal";

import { UsersColumnProps } from "./UsersColumn";

interface UsersActionProps { data: UsersColumnProps };

const UsersAction: React.FC<UsersActionProps> = ({ data }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toastStyle = {
    style: {
      color: theme === "light" ? "black" : "white",
      border: "1px solid rgb(0 0 0 / 0.1)",
      backgroundColor: theme === "light" ? "white" : "#262626",
    }
  } as const;

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/users/${data.id}`);

      toast.success("User deleted", toastStyle);
      router.refresh();

    } catch (error) {
      toast.error("Internal error", toastStyle);

    } finally {
      setIsOpen(false);
      setIsLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("User ID copied to clipboard", toastStyle);
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onConfirm}
        loading={isLoading}
      />

      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => onCopy(data.id.toString())}>
            <Copy className="mr-2 h-4 w-4" /> Copy ID
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push(`/users/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem> 
        </DropdownMenuContent>
      </DropdownMenu> */}

      <div className="flex items-center justify-center gap-x-2">
        <Tooltip content="Copy ID">
          <Copy className="h-4 w-4 cursor-pointer" onClick={() => onCopy(data.id.toString())} />
        </Tooltip>
        <Tooltip className="text-blue-500" content="Edit">
          <Edit className="text-blue-500 h-4 w-4 cursor-pointer" onClick={() => router.push(`/users/${data.id}`)} />
        </Tooltip>
        <Tooltip className="text-red-500" content="Delete">
          <Trash className="text-red-500 h-4 w-4 cursor-pointer" onClick={() => setIsOpen(true)} />
        </Tooltip>
      </div>
    </>
  );
};
export default UsersAction;