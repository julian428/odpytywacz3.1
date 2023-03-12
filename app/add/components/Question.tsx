import StandardSmallInput from "@/app/ui/smallInput";
import { ChangeEvent, MouseEvent } from "react";
import { AiFillDelete as DelteIcon } from "react-icons/ai";

interface Props {
  question: {
    question: string;
    answear: string;
  };
  state: {
    question: string;
    answear: string;
  }[];
  setState: any;
  updateState: any;
  index: number;
}

export default function Question({
  updateState,
  question,
  state,
  setState,
  index,
}: Props) {
  const questionHandler = (event: ChangeEvent) => {
    const q = state;
    q[index].question = event.target.value;
    setState(q);
  };
  const answearHandler = (event: ChangeEvent) => {
    const q = state;
    q[index].answear = event.target.value;
    setState(q);
  };
  const deleteHandler = (event: MouseEvent) => {
    updateState(Math.round(Math.random() * 100));
    let q = state;
    q = q.filter((a) => a !== question);
    console.log(q);
    setState(q);
  };
  return (
    <section className="flex gap-1">
      <StandardSmallInput
        required
        placeholder="pytanie"
        params={{ onChange: questionHandler }}
      />
      <StandardSmallInput
        required
        placeholder="odpowiedź"
        params={{ onChange: answearHandler }}
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
