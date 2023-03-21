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
import DownloadChapterButton from "./DownloadChapterButton";
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
  const value = answearRef.value.trim().toLowerCase();
  if (value === question.answear.toLowerCase()) {
    answearRef.className += " text-10";
    setPoints((state) => ({ ...state, correct: state.correct + 1 }));
  } else {
    answearRef.className += " text-red-500";
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

  const resetHandler = (event: FormEvent) => {
    event.currentTarget
      .querySelectorAll("input")
      .forEach((input: HTMLInputElement) => {
        input.disabled = false;
        let parentClass = input.parentElement!.className;
        parentClass = parentClass.replace("bg-30", "");
        parentClass = parentClass.replace("text-60", "");
        let inputClass = input.className;
        inputClass = inputClass.replace("text-10", "");
        inputClass = inputClass.replace("text-red-500", "");
        input.parentElement!.className = parentClass;
        input.className = inputClass;
      });
    setPoints((state: any) => ({ correct: 0, wrong: 0 }));
    setTime(new Date().getTime());
    buttonRef.current!.style.display = "block";
  };

  const handleModalClose = () => {
    router.refresh();
    setOpenModal(false);
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
      <DownloadChapterButton chapter={chapter} />
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={submitHandler}
        onReset={resetHandler}
      >
        <h1 className="text-2xl">
          {points.correct + "/" + chapter.owned_questions.length}
        </h1>
        <section className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto scrollbar-none">
          {chapter.owned_questions.map((question: QuestionType) => (
            <Question
              question={question}
              setPoints={setPoints}
              key={question.id}
            />
          ))}
        </section>
        <section className="flex gap-2 absolute bottom-2">
          <StandardSubmit
            ref={buttonRef}
            label="sprawdź"
          />
          <button
            type="reset"
            className="border rounded py-1 px-4 w-full"
          >
            Restart
          </button>
        </section>
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
