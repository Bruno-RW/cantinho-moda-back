"use client";

import { Input, Select, SelectItem } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

import { FaEnvelope, FaLock, FaUnlock } from "react-icons/fa";
import { LuTrash } from "react-icons/lu";
import { FiUser} from "react-icons/fi";

import { User } from "@prisma/client";

import { iconStyle, userFormData, userFormSchema } from "@/lib/types/forms";
import useToastStyle from "@/hooks/useToastStyle";
import { cn } from "@/lib/utils";

import ErrorMessage from "@/components/forms/ErrorMessage";
import AlertModal from "@/components/modals/AlertModal";
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
  const { toastStyle } = useToastStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title        = initialData ? "Edit user" : "Create user";
  const description  = initialData ? "Edit admin user" : "New admin user";
  const toastMessage = initialData ? "User updated" : "User created";
  const submitLabel  = initialData ? (isLoading ? "Saving..." : "Save") : (isLoading ? "Creating..." : "Create");
  
  const confirmPassword = initialData?.password;

  const { handleSubmit, register, reset, setFocus, formState: {errors} } = useForm<userFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: { ...initialData, confirmPassword } || {
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
      reset();
      setFocus("name");
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/users/${params.userId}`);

      router.push("/users");
      toast.success("User deleted", toastStyle);

    } catch (error) {
      toast.error("Internal error", toastStyle);

    } finally {
      setIsOpen(false);
      setIsLoading(false);
      reset();
      setFocus("name");
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />

      <section className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <Heading title={title} description={description} />

          {initialData && 
            <Button className="px-3 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600" variant="red" onClick={() => setIsOpen(true)}>
              <LuTrash size={20} />
            </Button>
          }
        </div>

        <form className="flex flex-col w-full gap-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-full">
              <Input endContent={<FiUser {...iconStyle} />}
                {...register("name")}
                label="Name"
                variant="bordered"
                isRequired
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
                isRequired
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
              isRequired
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
                isRequired
              />
              {errors.password && <ErrorMessage className="ml-2" message={errors.password.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/2">
              <Input endContent={<FaLock {...iconStyle} />}
                {...register("confirmPassword")}
                type="password"
                label="Confirm password"
                variant="bordered"
                isRequired
              />
              {errors.confirmPassword && <ErrorMessage className="ml-2" message={errors.confirmPassword.message} />}
            </div>
          </div>

          <Button className={cn("w-1/4", isLoading && "bg-blue-600/70 dark:bg-blue-500/40")} type="submit" variant="blue" isLoading={isLoading}>{submitLabel}</Button>
        </form>
      </section>
    </>
  );
}
export default UserForm;