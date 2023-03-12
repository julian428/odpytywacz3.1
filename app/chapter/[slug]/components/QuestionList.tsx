"use client";

import StandardSelfModal from "@/app/ui/selfModal";
import StandardSubmit from "@/app/ui/submit";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
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
  setPoints: Dispatch<
    SetStateAction<{
      correct: number;
      wrong: number;
    }>
  >
) {
  if (answearRef.disabled) return;
  const value = answearRef.value.toLowerCase();
  if (value === question.answear) {
    answearRef.className += " text-10";
    setPoints((state) => ({ ...state, correct: state.correct + 1 }));
  } else {
    answearRef.style.color = "red";
    answearRef.value += " => " + question.answear;
    setPoints((state) => ({ ...state, wrong: state.wrong + 1 }));
  }
  answearRef.disabled = true;
  answearRef.parentElement!.className += " bg-30 text-60 w-fit";
}

export default function QuestionList({ chapter }: Props) {
  const [points, setPoints] = useState({ correct: 0, wrong: 0 });
  const [openModal, setOpenModal] = useState(false);
  const [time, setTime] = useState(new Date().getTime());
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { user } = useUser();

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const inputs = event.currentTarget.querySelectorAll("input");
    inputs.forEach((input: any, index: number) => {
      wordCheck(chapter.owned_questions[index], input, setPoints);
    });
  };

  const handleModalClose = () => {
    setOpenModal(false);
    router.refresh();
  };

  useEffect(() => {
    if (points.correct + points.wrong < chapter.owned_questions.length) return;
    const fTime = new Date().getTime() - time;
    setTime(fTime);
    buttonRef.current!.style.display = "none";
    setOpenModal(true);
    const setData = async () => {
      if (points.correct === 0 || !user) return;
      const res1 = await fetch("/api/add-xp", {
        method: "POST",
        body: JSON.stringify({
          user,
          xp: points.correct,
        }),
      });
      if (points.correct !== chapter.owned_questions.length) return;
      const res2 = await fetch("/api/top-times", {
        method: "POST",
        body: JSON.stringify({
          user: user.nickname,
          time: fTime,
          chapterId: chapter.id,
        }),
      });
    };
    setData();
  }, [points]);

  return (
    <>
      <form
        onSubmit={submitHandler}
        className=" w-96 text-30 flex flex-col gap-4 items-center"
      >
        <h1 className="text-xl">
          {points.correct + "/" + chapter.owned_questions.length}
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
        <StandardSubmit
          ref={buttonRef}
          label="sprawdź"
        />
      </form>
      <StandardSelfModal
        isOpen={openModal}
        handleClose={handleModalClose}
        title={`Zakończyłeś ${chapter.title}`}
        text={
          user
            ? `Zdobyłeś ${points.correct}xp w ${time / 1000}s`
            : "Zaloguj się żeby zdobywać xp"
        }
      />
    </>
  );
}
