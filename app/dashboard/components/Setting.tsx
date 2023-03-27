"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  setting: { label: string; name: string; options: string[] };
}

export default function Setting({ setting }: Props) {
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
                defaultChecked={localStorage.getItem(setting.name) === option}
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
