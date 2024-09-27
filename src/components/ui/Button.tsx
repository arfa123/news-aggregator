import { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { ArrowPathIcon } from "@heroicons/react/24/solid";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = ({
  children,
  className,
  loading = false,
  disabled,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`relative w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto ${className}`}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <ArrowPathIcon
            className="size-5 animate-spin text-white"
            aria-hidden="true"
          />
        </span>
      )}
      <span className={loading ? "invisible" : "visible"}>{children}</span>
    </button>
  );
};

export default Button;
