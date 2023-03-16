"use client";

import { ChangeEvent, ForwardedRef, forwardRef } from "react";

interface Props {
  type?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  params?: Object;
  onChange?: (event: ChangeEvent) => void;
  onBlur?: (event: ChangeEvent) => void;
}

const StandardInput = forwardRef(
  (
    { type, placeholder, label, required, params, onChange, onBlur }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const iHopeUnique = (Math.random() * Math.random()).toString();
    return (
      <section
        className={`flex flex-col w-full gap-2 items-center py-1 rounded`}
      >
        <label htmlFor={iHopeUnique}>{label}</label>
        <input
          {...params}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          placeholder={placeholder}
          required={required}
          ref={ref}
          id={iHopeUnique}
          className="px-4 py-1 rounded border bg-transparent outline-none text-center w-full focus:text-left focus:bg-30 focus:placeholder:text-transparent transition-all"
        />
      </section>
    );
  }
);

export default StandardInput;
