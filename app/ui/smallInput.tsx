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
        {...params}
        className="w-[98px] px-2 py-1 border border-30 bg-transparent rounded outline-none placeholder:text-center focus:bg-30 transition-all focus:text-60 focus:placeholder:text-transparent"
      />
    );
  }
);

export default StandardSmallInput;
