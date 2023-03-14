"use client";

import StandardSmallInput from "@/app/ui/smallInput";
import { ChangeEvent, MouseEvent } from "react";
import { AiFillDelete as DelteIcon } from "react-icons/ai";

interface Props {
  question: {
    question: string;
    answear: string;
  };
  index: number;
  handleChange: (event: ChangeEvent, index: number) => void;
  handleRemove: (event: MouseEvent, index: number) => void;
}

export default function Question({
  question,
  index,
  handleChange,
  handleRemove,
}: Props) {
  return (
    <section className="flex gap-1">
      <StandardSmallInput
        required
        placeholder="pytanie"
        params={{
          onChange: (event: ChangeEvent) => handleChange(event, index),
          name: "question",
          value: question.question,
        }}
      />
      <StandardSmallInput
        required
        placeholder="odpowiedź"
        params={{
          onChange: (event: ChangeEvent) => handleChange(event, index),
          name: "answear",
          value: question.answear,
        }}
      />
      <button
        type="button"
        onClick={(event: MouseEvent) => handleRemove(event, index)}
        className="flex border border-10 text-10 rounded justify-center items-center w-[34px] text-lg"
      >
        <DelteIcon />
      </button>
    </section>
  );
}
