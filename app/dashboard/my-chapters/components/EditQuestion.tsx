import StandardSmallInput from "@/app/ui/smallInput";
import { ChangeEvent, MouseEvent } from "react";
import { AiFillDelete as DeleteIcon } from "react-icons/ai";

interface Props {
  question: {
    id: string;
    answear: string;
    question: string;
  };
  index: number;
  changeHandler: (event: ChangeEvent, index: number) => void;
  removeHandler: (event: MouseEvent, index: number) => void;
}

export default function EditQuestion({
  question,
  index,
  changeHandler,
  removeHandler,
}: Props) {
  return (
    <section className="items-center flex justify-between">
      <StandardSmallInput
        required
        params={{
          onChange: (event: ChangeEvent) => changeHandler(event, index),
          value: question.question,
          name: "question",
        }}
      />
      <StandardSmallInput
        required
        params={{
          onChange: (event: ChangeEvent) => changeHandler(event, index),
          value: question.answear,
          name: "answear",
        }}
      />
      <button
        type="button"
        onClick={(event: MouseEvent) => removeHandler(event, index)}
        className="text-red-500 border border-red-500 p-1 rounded h-full"
      >
        <DeleteIcon />
      </button>
    </section>
  );
}
