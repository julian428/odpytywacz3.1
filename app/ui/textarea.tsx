import { ForwardedRef, forwardRef } from "react";

interface Props {
  placeholder?: string;
  required?: boolean;
  params?: Object;
}

const StandardTextarea = forwardRef(
  (
    { placeholder, required, params }: Props,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const iHopeUnique = (Math.random() * Math.random()).toString();
    return (
      <textarea
        rows={4}
        id={iHopeUnique}
        placeholder={placeholder}
        ref={ref}
        {...params}
        required={required}
        className="px-4 py-1 rounded border bg-transparent outline-none text-center w-full focus:text-left focus:bg-30 focus:placeholder:text-transparent transition-all"
      />
    );
  }
);

export default StandardTextarea;
