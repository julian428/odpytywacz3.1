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
        {...params}
        ref={ref}
        required
        className="bg-30 py-1 px-4 rounded text-60 outline-none"
      >
        {children}
      </select>
    );
  }
);

export default StandardSelect;
