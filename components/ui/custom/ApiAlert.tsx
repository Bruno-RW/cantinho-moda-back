"use client";

import { Copy, Server } from "lucide-react";
import { toast } from "react-hot-toast";

import { useTheme } from "@/context/ThemeContext";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import Button from "@/components/ui/custom/Button";
interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "default",
};

const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const { theme } = useTheme();

  const toastStyle = {
    style: {
      color: theme === "light" ? "black" : "white",
      border: "1px solid rgb(0 0 0 / 0.1)",
      backgroundColor: theme === "light" ? "white" : "#262626",
    }
  } as const;

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to clipboard", toastStyle);
  };

  return (
    <Alert className="bg-shadow dark:bg-black/10 dark:shadow-none">
      <AlertTitle className="flex items-center gap-x-2">
        <Server className="h-4" />
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>

      <AlertDescription className="flex items-center justify-between mt-4">
        <code className="font-mono text-sm font-semibold py-[0.2rem] px-[0.3rem] rounded bg-gray-200 dark:bg-black/20">
          {description}
        </code>
        
        <Button className="bg-border px-3.5 dark:bg-neutral-950/50" onClick={() => onCopy(description)}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
export default ApiAlert;