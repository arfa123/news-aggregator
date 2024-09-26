import { PropsWithChildren } from "react";

const Checkbox = ({ children }: PropsWithChildren) => {
  return (
    <label className="flex items-center space-x-2">
      <input type="checkbox" className="text-blue-500" />
      <span>{children}</span>
    </label>
  );
};

export default Checkbox;
