import StandardSmallInput from "@/app/ui/smallInput";
import { ChangeEvent, MouseEvent } from "react";
import { AiFillDelete as DeleteIcon } from "react-icons/ai";

interface Props {
  question: {
    id: string;
    answear: string;
    question: string;
  };
  isLoading: boolean;
  index: number;
  changeHandler: (event: ChangeEvent, index: number) => void;
  removeHandler: (event: MouseEvent, index: number) => void;
}

export default function EditQuestion({
  question,
  index,
  isLoading,
  changeHandler,
  removeHandler,
}: Props) {
  return (
    <section className="flex gap-2 items-center">
      <StandardSmallInput
        required
        params={{
          onChange: (event: ChangeEvent) => changeHandler(event, index),
          value: question.question,
          name: "question",
          disabled: isLoading,
        }}
      />
      <StandardSmallInput
        required
        params={{
          onChange: (event: ChangeEvent) => changeHandler(event, index),
          value: question.answear,
          name: "answear",
          disabled: isLoading,
        }}
      />
      <button
        type="button"
        disabled={isLoading}
        className="w-8 h-8 border border-red-500 text-red-500 rounded flex justify-center items-center"
        onClick={(event: MouseEvent) => removeHandler(event, index)}
      >
        <DeleteIcon />
      </button>
    </section>
  );
}
