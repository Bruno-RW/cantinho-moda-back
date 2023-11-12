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

import { newUserFormData, newUserFormSchema } from "@/lib/types/forms";

import ErrorMessage from "@/components/forms/ErrorMessage";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { cn } from "@/lib/utils";

type userTypesValues = {
  label: "Admin" | "Master",
  value: "A" | "M"
};

const userTypes: userTypesValues[] = [
  { label: "Admin", value: "A" },
  { label: "Master", value: "M" },
];

interface NewUserFormProps { initialData?: User | null };

const NewUserForm: React.FC<NewUserFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const title        = initialData ? "Edit user" : "Create user";
  const description  = initialData ? "Edit admin user" : "New admin user";
  const toastMessage = initialData ? "User updated" : "User created";
  const submitLabel  = initialData ? (isLoading ? "Saving..." : "Save") : (isLoading ? "Creating..." : "Create");
  
  const iconStyle = {
    className: "text-default-400",
    size: 20
  } as const;

  const { handleSubmit, register, formState: {errors} } = useForm<newUserFormData>({
    resolver: zodResolver(newUserFormSchema),
    defaultValues: initialData || {
      fullName: "",
      type: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: newUserFormData) => {
    try {
      setIsLoading(true);

      if (initialData) await axios.patch(`/api/users/${params.userId}`, data);
      else await axios.post("/api/users/new", data);

      router.push("/users");
      toast.success(toastMessage);

    } catch (error: any) {
      toast.error(error.response.data);

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
              {...register("fullName")}
              label="Name"
              variant="bordered"
              autoFocus
            />
            {errors.fullName && <ErrorMessage className="ml-2" message={errors.fullName.message} />}
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
export default NewUserForm;