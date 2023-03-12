"use client";

import StandardSmallInput from "@/app/ui/smallInput";
import { ChangeEvent, MouseEvent, useState } from "react";
import { AiFillDelete as DelteIcon } from "react-icons/ai";

interface Props {
  question: {
    question: string;
    answear: string;
  };
  setState: any;
  updateState: any;
  index: number;
}

export default function Question({
  updateState,
  question,
  setState,
  index,
}: Props) {
  const [helper, setHelper] = useState(0);

  const questionHandler = (event: ChangeEvent) => {
    updateState((state: number) => state + 1);
    setHelper((state: number) => state + 1);
    setState((state: any) => {
      const q = state;
      q[index].question = event.target.value;
      return q;
    });
  };
  const answearHandler = (event: ChangeEvent) => {
    updateState((state: number) => state + 1);
    setHelper((state: number) => state + 1);
    setState((state: any) => {
      const q = state;
      q[index].answear = event.target.value;
      return q;
    });
  };
  const deleteHandler = (event: MouseEvent) => {
    updateState((state: number) => state + 1);
    setHelper((state: number) => state + 1);
    setState((state: any) => {
      let q = state;
      q = q.filter((a: any) => a !== question);
      console.log(q);
      return q;
    });
  };
  return (
    <section className="flex gap-1">
      <StandardSmallInput
        required
        placeholder="pytanie"
        params={{
          onChange: questionHandler,
        }}
      />
      <StandardSmallInput
        required
        placeholder="odpowiedź"
        params={{
          onChange: answearHandler,
        }}
      />
      <button
        type="button"
        onClick={deleteHandler}
        className="flex border border-10 text-10 rounded justify-center items-center w-[34px] text-lg"
      >
        <DelteIcon />
      </button>
    </section>
  );
}
