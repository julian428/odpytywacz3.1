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
        className={`flex flex-col w-full gap-2 items-center rounded py-1`}
      >
        <label
          htmlFor={iHopeUnique}
          className="capitalize text-center"
        >
          {label}
        </label>
        <input
          {...params}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          placeholder={placeholder}
          required={required}
          ref={ref}
          id={iHopeUnique}
          className="bg-transparent border border-30 disabled:border-transparent disabled:text-center disabled:capitalize rounded placeholder:text-center outline-none px-4 py-2 focus:bg-30 transition-all focus:text-60 focus:placeholder:text-transparent"
        />
      </section>
    );
  }
);

export default StandardInput;
