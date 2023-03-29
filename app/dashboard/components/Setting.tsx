"use client";

import { useEffect } from "react";

interface Props {
  setting: { label: string; name: string; options: string[] };
}

export default function Setting({ setting }: Props) {
  const isChecked = (option: string) => {
    try {
      const is = localStorage.getItem(setting.name) === option;
      return is;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    if (!localStorage.getItem(setting.name)) {
      localStorage.setItem(setting.name, setting.options[0]);
    }
  }, []);

  return (
    <section className="text-center capitalize">
      <h2>{setting.label}</h2>
      <form className="flex justify-evenly items-center gap-8">
        {setting.options.map((option: string) => {
          return (
            <section
              key={option}
              className="flex gap-1"
            >
              <input
                type="radio"
                id={option}
                value={option}
                name={setting.name}
                defaultChecked={isChecked(option)}
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
