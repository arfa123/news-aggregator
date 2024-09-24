import { InputHTMLAttributes } from "react";

import Label from "@/components/ui/Label";

const Input = ({
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) => {
  return (
    <>
      {label && <Label htmlFor={props.name}>{label}</Label>}
      <input
        {...props}
        id={props.name}
        className={`w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ""}`}
      />
    </>
  );
};

export default Input;
