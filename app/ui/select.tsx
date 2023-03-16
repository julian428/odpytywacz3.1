import { forwardRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  required?: boolean;
  params?: any;
}

const StandardSelect = forwardRef(
  ({ children, params, required }: Props, ref) => {
    return (
      <select
        className="bg-30 outline-none py-1 px-4 rounded text-30"
        {...params}
        ref={ref}
        required={required}
      >
        {children}
      </select>
    );
  }
);

export default StandardSelect;
