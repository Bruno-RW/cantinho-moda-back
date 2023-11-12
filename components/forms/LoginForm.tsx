"use client";

import { Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useState } from "react";

import { newLoginFormData, newLoginFormSchema } from "@/lib/types/forms";
import { cn } from "@/lib/utils";

import ErrorMessage from "@/components/forms/ErrorMessage";
import Button from "@/components/ui/Button";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const submitLabel  = (isLoading ? "Signing in..." : "Sign in")

  const iconStyle = {
    className: "self-center text-default-400",
    size: 20
  } as const;

  const { handleSubmit, register, reset, formState: {errors} } = useForm<newLoginFormData>({
    resolver: zodResolver(newLoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  const onSubmit = async (data: newLoginFormData) => {
    try {
      setIsLoading(true);

      const loginData = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      });

      if (loginData?.error) {
        toast.error("Incorrect e-mail or password");
        return;
      }
      
      router.push("/");

    } catch (error) {
      toast.error("Something went wrong");

    } finally {
      reset();
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col w-full py-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-3 mb-[18px]">
        <div className="flex flex-col gap-y-1">
          <Input endContent={<FaEnvelope {...iconStyle} />}
            {...register("email")}
            name="email"
            label="Email"
            variant="bordered"
            autoComplete="email"
            autoFocus
          />
          {errors.email && <ErrorMessage className="ml-2" message={errors.email.message} />}
        </div>

        <div className="flex flex-col gap-y-1">
          <Input endContent={<FaLock {...iconStyle} />}
            {...register("password")}
            type="password"
            name="password"
            label="Password"
            variant="bordered"
          />
          {errors.password && <ErrorMessage className="ml-2" message={errors.password.message} />}
        </div>
      </div>

      <Button className={cn(isLoading && "bg-blue-600/70 dark:bg-blue-500/40")}
        type="submit"
        variant="blue"
        isLoading={isLoading}
      >
        {submitLabel}
      </Button>
    </form>
  );
};
export default LoginForm;