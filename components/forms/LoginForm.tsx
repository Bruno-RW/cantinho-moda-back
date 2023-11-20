"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useState } from "react";

import { loginFormData, loginFormSchema } from "@/lib/types/forms";
import useToastStyle from "@/hooks/useToastStyle";
import { cn } from "@/lib/utils";

import ErrorMessage from "@/components/forms/ErrorMessage";
import Button from "@/components/ui/custom/Button";

const LoginForm = () => {
  const router = useRouter();
  const { toastStyle } = useToastStyle();
  const [isLoading, setIsLoading] = useState(false);

  const iconStyle = {
    className: "self-center text-default-400",
    size: 20
  } as const;
  
  const submitLabel  = (isLoading ? "Signing in..." : "Sign in");

  const { handleSubmit, register, reset, formState: {errors} } = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  let isUserError = false;
  const onSubmit = async (data: loginFormData) => {
    try {
      setIsLoading(true);

      const loginData = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      });

      if (loginData?.error) {
        toast.error("Incorrect e-mail or password", toastStyle);
        isUserError = true;
        return;
      }
      
      router.push("/");

    } catch (error) {
      toast.error("Something went wrong", toastStyle);

    } finally {
      reset();
      setIsLoading(false);

      if(!isUserError) toast.loading("Redirecting...", {...toastStyle, duration: Infinity});
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