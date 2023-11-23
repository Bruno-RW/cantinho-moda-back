"use client";

import { Input, Textarea } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

import { BsDiagram3 } from "react-icons/bs";
import { LuTrash } from "react-icons/lu";

import { User } from "@prisma/client";

import { iconStyle, categoryFormData, categoryFormSchema } from "@/lib/types/forms";
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

interface CategoryFormProps { initialData?: User | null };

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const { toastStyle } = useToastStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title        = initialData ? "Edit category" : "Create category";
  const description  = initialData ? "Edit category" : "New category";
  const toastMessage = initialData ? "Category updated" : "Category created";
  const submitLabel  = initialData ? (isLoading ? "Saving..." : "Save") : (isLoading ? "Creating..." : "Create");
  
  const { handleSubmit, register, formState: {errors} } = useForm<categoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: categoryFormData) => {
    try {
      setIsLoading(true);

      if (initialData) await axios.patch(`/api/categories/${params.categoryId}`, data);
      else await axios.post("/api/categories/new", data);

      router.push("/categories");
      toast.success(toastMessage, toastStyle);

    } catch (error: any) {
      toast.error(error.response.data, toastStyle);

    } finally {
      setIsLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/categories/${params.categoryId}`);

      router.push("/categories");
      toast.success("Category deleted", toastStyle);

    } catch (error) {
      toast.error("Internal error", toastStyle);

    } finally {
      setIsOpen(false);
      setIsLoading(false);
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
          <div className="flex flex-col gap-y-1 w-full">
            <Input endContent={<BsDiagram3 {...iconStyle} />}
              {...register("name")}
              label="Name"
              variant="bordered"
              isRequired
              autoFocus
            />
              {errors.name && <ErrorMessage className="ml-2" message={errors.name.message} />}
          </div>
  
          <div className="flex flex-col gap-y-1 w-full">
            <Textarea classNames={{ input: "resize-y min-h-[40px]" }}
              {...register("description")}
              label="Description"
              variant="bordered"
              disableAutosize
              rows={5}
            />
              {errors.description && <ErrorMessage className="ml-2" message={errors.description.message} />}
          </div>

          <Button className={cn("w-1/4", isLoading && "bg-blue-600/70 dark:bg-blue-500/40")} type="submit" variant="blue" isLoading={isLoading}>{submitLabel}</Button>
        </form>
      </section>
    </>
  );
}
export default CategoryForm;