import { forwardRef } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  isLoading,
  href,
  type = "button",
  ...props
}, ref) => {
  return (
    <>
      {href ? (
        <Link 
          className={cn(
            "bg-border h-10 p-2 rounded-lg outline-offset-4 transition active:scale-95", className
          )}
          href={href}
        >
          <div className="flex items-center justify-center gap-x-2">
            {isLoading && (<div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />)}
            {children}
          </div>
        </Link>
      ) : (
        <button 
          className={cn(
            "bg-border h-10 rounded-lg outline-offset-4 transition active:scale-95", className
          )}
          {...props}
          disabled={disabled || isLoading}
          ref={ref}
          type={type}
        >
          <div className="flex items-center justify-center gap-x-2">
            {isLoading && (<div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />)}
            {children}
          </div>
        </button>
      )}
    </>
  );
});

Button.displayName = "Button";
export default Button;