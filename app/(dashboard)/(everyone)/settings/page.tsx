"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { Edit } from "lucide-react";
import { LuMail, LuUser } from "react-icons/lu";

import { Input } from "@nextui-org/react";

import useToastStyle from "@/hooks/useToastStyle";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import Separator from "@/components/ui/custom/Separator";
import Heading from "@/components/ui/custom/Heading";
import Button from "@/components/ui/custom/Button";


import { iconStyle } from "@/lib/types/forms";

const SettingsPage = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { toastStyle } = useToastStyle();

  const onClick = () => setIsDisabled(!isDisabled);

  const onSubmit = () => {
    return "";
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-3">
        <Heading title="Settings" description="Manage your settings"/>
        <Separator />
      </div>

      <Alert className="bg-shadow flex flex-col dark:bg-black/10 dark:shadow-none">
        <AlertTitle className="flex items-center justify-between gap-x-2 text-2xl m-0 p-0">
          <span className="text-3xl m-0 p-0">
            Personal Information
          </span>
          
          <Button className="px-3" onClick={onClick}>
            <Edit className="self-center h-4 w-4 cursor-pointer"/>
          </Button>
        </AlertTitle>

        <AlertDescription className="flex flex-col sm:flex-row mt-2 gap-y-2 gap-x-3">
          <Input endContent={<LuUser {...iconStyle} />}
            className="flex items-center w-1/3"
            defaultValue="Bruno Wunsch"
            label="Name"
            variant="bordered"
            autoComplete="new-password"
            isDisabled={isDisabled}
          />

          <Input endContent={<LuMail {...iconStyle} />}
            className="flex items-center w-1/3"
            defaultValue="bruno_wunsch@hotmail.com"
            label="Email"
            variant="bordered"
            autoComplete="new-password"
            isDisabled={isDisabled}
          />
        </AlertDescription>

        {!isDisabled && 
          <Button className="w-20 mt-3" variant="blue" onClick={onSubmit}>
            Confirm
          </Button>
        }
      </Alert>
    </div>
  );
}
export default SettingsPage;