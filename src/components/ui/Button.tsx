import { ButtonHTMLAttributes, PropsWithChildren } from "react";

const Button = ({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      {...props}
      className={`w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:w-auto ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
