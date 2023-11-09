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
  const elementClass = "bg-border h-10 p-2 rounded-lg transition active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";
  const divClass     = "flex items-center justify-center gap-x-2";
  const loadingClass = "h-5 w-5 animate-spin rounded-full border-b-2 border-white";

  return (
    <>
      {href ? (
        <Link className={cn(elementClass, isLoading && "active:scale-100 transition-none", className)} href={href}>
          <div className={divClass}>
            {isLoading && (<div className={loadingClass} />)}
            {children}
          </div>
        </Link>
      ) : (
        <button className={cn(elementClass, isLoading && "active:scale-100 transition-none", className)}
          {...props}
          disabled={disabled || isLoading}
          ref={ref}
          type={type}
        >
          <div className={divClass}>
            {isLoading && (<div className={loadingClass} />)}
            {children}
          </div>
        </button>
      )}
    </>
  );
});

Button.displayName = "Button";
export default Button;