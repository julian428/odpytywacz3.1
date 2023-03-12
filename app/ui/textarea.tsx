import { ForwardedRef, forwardRef } from "react";

interface Props {
  placeholder?: string;
  required?: boolean;
}

const StandardTextarea = forwardRef(
  ({ placeholder }: Props, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const iHopeUnique = (Math.random() * Math.random()).toString();
    return (
      <textarea
        className="w-full bg-60 border border-30 rounded outline-none px-4 py-2 focus:bg-30 transition-all focus:text-60 placeholder:text-center focus:placeholder:text-transparent"
        rows={4}
        id={iHopeUnique}
        placeholder={placeholder}
        ref={ref}
        required
      />
    );
  }
);

export default StandardTextarea;
