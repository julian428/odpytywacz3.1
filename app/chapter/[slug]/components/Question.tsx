import StandardInput from "@/app/ui/input";
import { Dispatch, SetStateAction, useRef } from "react";
import { QuestionType } from "../page";
import { wordCheck } from "./QuestionList";

interface Props {
  question: QuestionType;
  setPoints: Dispatch<
    SetStateAction<{
      correct: number;
      wrong: number;
    }>
  >;
}

export default function Question({ question, setPoints }: Props) {
  const answearRef = useRef<HTMLInputElement>(null);

  const blurHandler = () => {
    if (!localStorage.getItem("word-checking")) {
      localStorage.setItem("word-checking", "manual");
    }
    if (localStorage.getItem("word-checking") === "manual") return;
    if (!answearRef.current!.value) return;
    wordCheck(question, answearRef.current, setPoints);
  };

  const changeHandler = () => {
    if (localStorage.getItem("word-checking") !== "auto") return;
    const value = (answearRef.current as HTMLInputElement).value;
    if (value !== question.answear) return;
    wordCheck(question, answearRef.current, setPoints);
  };

  return (
    <StandardInput
      label={question.question}
      placeholder="odpowiedź"
      onChange={changeHandler}
      onBlur={blurHandler}
      ref={answearRef}
    />
  );
}
