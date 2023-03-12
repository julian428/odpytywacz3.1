"use client";

import StandardInput from "@/app/ui/input";
import { useRef } from "react";
import { QuestionType } from "../page";

export default function Question({ question }: { question: QuestionType }) {
  const answearRef = useRef<HTMLInputElement>(null);
  const blurHandler = () => {
    if (localStorage.getItem("word-checking") === "manual") return;
    if (!answearRef.current!.value) return;
    if (answearRef.current!.value === question.answear) {
      answearRef.current!.className += " text-10";
    } else {
      answearRef.current!.style.color = "red";
      answearRef.current!.value += " => " + question.answear;
    }
    answearRef.current!.disabled = true;
    answearRef.current!.parentElement!.className += " bg-30 text-60 w-fit";
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
