"use client";

import StandardInput from "@/app/ui/input";
import { Dispatch, SetStateAction, useRef } from "react";
import { QuestionType } from "../page";
import { wordCheck } from "./QuestionList";

interface Props {
  question: QuestionType;
  setPoints: Dispatch<SetStateAction<number>>;
}

export default function Question({ question, setPoints }: Props) {
  const answearRef = useRef<HTMLInputElement>(null);

  const blurHandler = () => {
    if (localStorage.getItem("word-checking") === "manual") return;
    if (!answearRef.current!.value) return;
    wordCheck(question, answearRef.current, setPoints);
  };

  const changeHandler = () => {
    if (localStorage.getItem("word-checking") !== "auto") return;
    console.log("auto spell check");
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
