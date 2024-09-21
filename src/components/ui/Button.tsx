import { ButtonHTMLAttributes, PropsWithChildren } from "react";

const Button = ({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      {...props}
      className={`rounded-md bg-blue-500 px-6 py-2 text-white transition duration-300 hover:bg-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
