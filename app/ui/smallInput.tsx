import { ForwardedRef, forwardRef } from "react";

interface Props {
  type?: string;
  placeholder?: string;
  required?: boolean;
  params?: any;
}

const StandardSmallInput = forwardRef(
  (
    { type, placeholder, required, params }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        ref={ref}
        autoComplete="off"
        className="w-24 focus:bg-30 focus:text-left focus:text-60 transition-all rounded py-1 px-4 text-center border bg-transparent outline-none focus:placeholder:text-transparent"
        {...params}
      />
    );
  }
);

export default StandardSmallInput;
