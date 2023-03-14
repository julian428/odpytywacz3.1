"use client";

import { useEffect, useState } from "react";

interface Props {
  setting: { label: string; name: string; options: string[] };
}

export default function Setting({ setting }: Props) {
  //!temporary solution
  const [checked, setChecked] = useState<"manual" | "semi-auto" | "auto">(
    "manual"
  );

  useEffect(() => {
    setChecked(
      localStorage.getItem(setting.name) as "manual" | "semi-auto" | "auto"
    );
  }, []);

  return (
    <section className="text-30 flex flex-col items-center py-2 px-1 border-b">
      <h2 className="capitalize text-lg">{setting.label}</h2>
      <form className="flex flex-wrap w-full justify-evenly items-center">
        {setting.options.map((option: string) => {
          return (
            <section
              key={option}
              className="flex justify-center items-center gap-1"
            >
              <input
                type="radio"
                id={option}
                value={option}
                name={setting.name}
                defaultChecked={checked === option}
                onChange={() => localStorage.setItem(setting.name, option)}
              />
              <label htmlFor={option}>{option}</label>
            </section>
          );
        })}
      </form>
    </section>
  );
}
