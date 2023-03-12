"use client";

import StandardSubmit from "@/app/ui/submit";
import {
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
  useState,
} from "react";
import { QuestionType } from "../page";
import Question from "./Question";

interface Props {
  chapter: {
    id: string;
    title: string;
    owned_questions: {
      id: string;
      question: string;
      answear: string;
    }[];
  };
}

export function wordCheck(
  question: QuestionType,
  answearRef: any,
  setPoints: Dispatch<SetStateAction<number>>
) {
  if (answearRef.disabled) return;
  const value = answearRef.value.toLowerCase();
  if (value === question.answear) {
    answearRef.className += " text-10";
    setPoints((state) => state + 1);
  } else {
    answearRef.style.color = "red";
    answearRef.value += " => " + question.answear;
  }
  answearRef.disabled = true;
  answearRef.parentElement!.className += " bg-30 text-60 w-fit";
}

export default function QuestionList({ chapter }: Props) {
  const [points, setPoints] = useState(0);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const inputs = event.currentTarget.querySelectorAll("input");
    inputs.forEach((input: any, index: number) => {
      wordCheck(chapter.owned_questions[index], input, setPoints);
    });
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className=" w-96 text-30 flex flex-col gap-4 items-center"
      >
        <h1 className="text-xl">
          {points}/{chapter.owned_questions.length}
        </h1>
        <section className="flex flex-col gap-4 items-center  mt-4">
          {chapter.owned_questions.map((question: QuestionType) => (
            <Question
              question={question}
              setPoints={setPoints}
              key={question.id}
            />
          ))}
        </section>
        <StandardSubmit label="sprawdź" />
      </form>
    </>
  );
}
