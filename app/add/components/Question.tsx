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
    <section className="flex gap-2 scrollbar-none">
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
        className="w-8 h-8 border flex justify-center items-center rounded border-red-500 text-red-500"
        onClick={(event: MouseEvent) => handleRemove(event, index)}
      >
        <DelteIcon />
      </button>
    </section>
  );
}
