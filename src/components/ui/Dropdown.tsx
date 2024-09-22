import { SelectHTMLAttributes } from "react";

import Label from "@/components/ui/Label";

const Dropdown = ({
  label,
  options,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  options: { label: string; value: string }[];
} & { label: string }) => {
  return (
    <>
      <Label htmlFor={props.name}>{label}</Label>
      <select
        {...props}
        id={props.name}
        className={`w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ""}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
