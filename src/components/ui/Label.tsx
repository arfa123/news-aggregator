import { LabelHTMLAttributes, PropsWithChildren } from "react";

const Label = ({
  children,
  className,
  ...props
}: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>) => {
  return (
    <label
      {...props}
      className={`mb-1 block text-sm font-medium text-gray-700 ${className || ""}`}
    >
      {children}
    </label>
  );
};

export default Label;
