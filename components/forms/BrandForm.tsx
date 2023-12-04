"use client";

import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

import { BsBookmarks, BsBuilding } from "react-icons/bs";
import { LuTrash } from "react-icons/lu";

import { Brand } from "@prisma/client";

import { iconStyle, brandFormData, brandFormSchema } from "@/lib/types/forms";
import useToastStyle from "@/hooks/useToastStyle";
import { cn } from "@/lib/utils";

import ErrorMessage from "@/components/forms/ErrorMessage";
import AlertModal from "@/components/modals/AlertModal";
import Heading from "@/components/ui/custom/Heading";
import Button from "@/components/ui/custom/Button";

interface BrandFormProps { initialData?: Brand | null };

const BrandForm: React.FC<BrandFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const { toastStyle } = useToastStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title        = initialData ? "Edit brand" : "Create brand";
  const description  = initialData ? "Edit brand" : "New brand";
  const toastMessage = initialData ? "Brand updated" : "Brand created";
  const submitLabel  = initialData ? (isLoading ? "Saving..." : "Save") : (isLoading ? "Creating..." : "Create");
  
  const { handleSubmit, register, reset, setFocus, formState: {errors} } = useForm<brandFormData>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: initialData || {
      name: "",
      manufacturer: "",
    },
  });

  const onSubmit = async (data: brandFormData) => {
    try {
      setIsLoading(true);

      if (initialData) await axios.patch(`/api/brands/${params.brandId}`, data);
      else await axios.post("/api/brands/new", data);

      router.push("/brands");
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
      await axios.delete(`/api/brands/${params.brandId}`);

      router.push("/brands");
      toast.success("Brand deleted", toastStyle);

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
          <div className="flex gap-x-2">
            <div className="flex flex-col gap-y-1 w-1/2">
              <Input endContent={<BsBookmarks {...iconStyle} />}
                {...register("name")}
                label="Name"
                variant="bordered"
                isRequired
                autoFocus
              />
                {errors.name && <ErrorMessage className="ml-2" message={errors.name.message} />}
            </div>
    
            <div className="flex flex-col gap-y-1 w-1/2">
              <Input endContent={<BsBuilding {...iconStyle} />}
                {...register("manufacturer")}
                label="Manufacturer"
                variant="bordered"
                isRequired
              />
                {errors.manufacturer && <ErrorMessage className="ml-2" message={errors.manufacturer.message} />}
            </div>
          </div>

          <Button className={cn("w-1/4", isLoading && "bg-blue-600/70 dark:bg-blue-500/40")} type="submit" variant="blue" isLoading={isLoading}>{submitLabel}</Button>
        </form>
      </section>
    </>
  );
}
export default BrandForm;