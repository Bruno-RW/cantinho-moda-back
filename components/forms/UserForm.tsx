"use client";

import { Input, Select, SelectItem } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

import { FaEnvelope, FaLock, FaUnlock } from "react-icons/fa";
import { FiUser} from "react-icons/fi";

import { User } from "@prisma/client";

import { userFormData, userFormSchema } from "@/lib/types/forms";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

import ErrorMessage from "@/components/forms/ErrorMessage";
import Heading from "@/components/ui/custom/Heading";
import Button from "@/components/ui/custom/Button";

type userTypesValues = {
  label: "Admin" | "Master",
  value: "A" | "M"
};

const userTypes: userTypesValues[] = [
  { label: "Admin", value: "A" },
  { label: "Master", value: "M" },
];

interface UserFormProps { initialData?: User | null };

const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const title        = initialData ? "Edit user" : "Create user";
  const description  = initialData ? "Edit admin user" : "New admin user";
  const toastMessage = initialData ? "User updated" : "User created";
  const submitLabel  = initialData ? (isLoading ? "Saving..." : "Save") : (isLoading ? "Creating..." : "Create");
  
  const toastStyle = {
    style: {
      color: theme === "light" ? "black" : "white",
      border: "1px solid rgb(0 0 0 / 0.1)",
      backgroundColor: theme === "light" ? "white" : "#262626",
    }
  } as const;

  const iconStyle = {
    className: "self-center text-default-400",
    size: 20
  } as const;

  const { handleSubmit, register, formState: {errors} } = useForm<userFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialData || {
      name: "",
      type: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: userFormData) => {
    try {
      setIsLoading(true);

      if (initialData) await axios.patch(`/api/users/${params.userId}`, data);
      else await axios.post("/api/users/new", data);

      router.push("/users");
      toast.success(toastMessage, toastStyle);

    } catch (error: any) {
      toast.error(error.response.data, toastStyle);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Heading title={title} description={description} />

      <form className="flex flex-col w-full gap-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-x-3">
          <div className="flex flex-col gap-y-1 w-full">
            <Input endContent={<FiUser {...iconStyle} />}
              {...register("name")}
              label="Name"
              variant="bordered"
              autoFocus
            />
            {errors.name && <ErrorMessage className="ml-2" message={errors.name.message} />}
          </div>

          <div className="flex flex-col gap-y-1 w-1/2">
            <Select
              {...register("type")}
              label="Type"
              variant="bordered"
              items={userTypes}
            >
              {type => <SelectItem key={type.value}>{type.label}</SelectItem>}
            </Select>
            {errors.type && <ErrorMessage className="ml-2" message={errors.type.message} />}
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <Input endContent={<FaEnvelope {...iconStyle} />}
            {...register("email")}
            label="Email"
            variant="bordered"
          />
          {errors.email && <ErrorMessage className="ml-2" message={errors.email.message} />}
        </div>

        <div className="flex gap-x-3">
          <div className="flex flex-col gap-y-1 w-1/2">
            <Input endContent={<FaUnlock {...iconStyle} />}
              {...register("password")}
              type="password"
              label="Password"
              variant="bordered"
            />
            {errors.password && <ErrorMessage className="ml-2" message={errors.password.message} />}
          </div>

          <div className="flex flex-col gap-y-1 w-1/2">
            <Input endContent={<FaLock {...iconStyle} />}
              {...register("confirmPassword")}
              type="password"
              label="Confirm password"
              variant="bordered"
            />
            {errors.confirmPassword && <ErrorMessage className="ml-2" message={errors.confirmPassword.message} />}
          </div>
        </div>

        <Button className={cn("w-1/4", isLoading && "bg-blue-600/70 dark:bg-blue-500/40")} type="submit" variant="blue" isLoading={isLoading}>{submitLabel}</Button>
      </form>
    </>
  );
}
export default UserForm;