"use client";

import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

import { LuLock, LuMail, LuTrash, LuUnlock, LuUser } from "react-icons/lu";

import { Client } from "@prisma/client";

import { iconStyle, clientFormData, clientFormSchema } from "@/lib/types/forms";
import useToastStyle from "@/hooks/useToastStyle";
import { cn } from "@/lib/utils";

import ErrorMessage from "@/components/forms/ErrorMessage";
import AlertModal from "@/components/modals/AlertModal";
import Heading from "@/components/ui/custom/Heading";
import Button from "@/components/ui/custom/Button";

interface ClientFormProps { initialData?: Client | null };

const ClientForm: React.FC<ClientFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const { toastStyle } = useToastStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title        = initialData ? "Edit client" : "Create client";
  const description  = initialData ? "Edit client" : "New client";
  const toastMessage = initialData ? "Client updated" : "Client created";
  const submitLabel  = initialData ? (isLoading ? "Saving..." : "Save") : (isLoading ? "Creating..." : "Create");
  
  const confirmPassword = initialData?.password;

  const { handleSubmit, register, reset, setFocus, formState: {errors} } = useForm<clientFormData>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: { ...initialData, confirmPassword } || {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: clientFormData) => {
    try {
      setIsLoading(true);

      if (initialData) await axios.patch(`/api/clients/${params.clientId}`, data);
      else await axios.post("/api/clients/new", data);

      router.push("/clients");
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
      await axios.delete(`/api/clients/${params.clientId}`);

      router.push("/clients");
      toast.success("Client deleted", toastStyle);

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
            <div className="flex flex-col gap-y-1 w-2/5">
              <Input endContent={<LuUser {...iconStyle} />}
                {...register("name")}
                label="Name"
                variant="bordered"
                isRequired
                autoFocus
              />
              {errors.name && <ErrorMessage message={errors.name.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-3/5">
              <Input endContent={<LuMail {...iconStyle} />}
                {...register("email")}
                label="Email"
                variant="bordered"
                isRequired
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>
          </div>


          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-1/2">
              <Input endContent={<LuUnlock {...iconStyle} />}
                {...register("password")}
                type="password"
                label="Password"
                variant="bordered"
                isRequired
              />
              {errors.password && <ErrorMessage message={errors.password.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/2">
              <Input endContent={<LuLock {...iconStyle} />}
                {...register("confirmPassword")}
                type="password"
                label="Confirm password"
                variant="bordered"
                isRequired
              />
              {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword.message} />}
            </div>
          </div>

          <Button className={cn("w-1/4", isLoading && "bg-blue-600/70 dark:bg-blue-500/40")} type="submit" variant="blue" isLoading={isLoading}>{submitLabel}</Button>
        </form>
      </section>
    </>
  );
}
export default ClientForm;