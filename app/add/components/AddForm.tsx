"use client";

import StandardInput from "@/app/ui/input";
import StandardSelect from "@/app/ui/select";
import StandardTextarea from "@/app/ui/textarea";
import { SectionType } from "../page";
import { BiMessageSquareAdd as AddIcon } from "react-icons/bi";
import StandardSubmit from "@/app/ui/submit";
import Question from "./Question";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";

interface Props {
  sections: SectionType[];
}

interface addQuestion {
  question: string;
  answear: string;
}

export default function AddForm({ sections }: Props) {
  //? i didn't use useReducer here bc it triggered twice for some reason and added two questions. Problem for future me
  //? and i have to use a helper state bc the question state doesn't update the DOM

  const titleRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useUser();

  const [questions, setQuestions] = useState<addQuestion[]>([]);
  const [helper, setHelper] = useState(0);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const addHandler = () => {
    setHelper(helper + 1);
    const q = questions;
    q.push({ answear: "", question: "" });
    setQuestions(q);
  };
  const submitHandler = async (event: FormEvent) => {
    setLoading(true);
    const data = {
      questions,
      title: titleRef.current?.value,
      section: sectionRef.current?.value,
      description: descriptionRef.current?.value,
      owner: user?.nickname,
    };
    const createResponse = await fetch("/api/add-chapter", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  if (firstLoad) {
    return (
      <center>
        <LoadingIcon className=" animate-spin text-lg" />
      </center>
    );
  }

  if (!user) {
    return (
      <center>
        <p>Zaloguj się żeby stworzyć rozdział</p>
      </center>
    );
  }

  if (!sections || !sections.length) {
    return (
      <center>
        <p>Nie znaleziono żadnych sekcji</p>
      </center>
    );
  }

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-2"
    >
      <StandardInput
        placeholder="Tytuł"
        ref={titleRef}
        required
      />
      <StandardSelect
        ref={sectionRef}
        params={{ defaultValue: sections[0].id }}
      >
        {sections.map((section: SectionType) => {
          return (
            <option
              key={section.id}
              value={section.id}
            >
              {section.name}
            </option>
          );
        })}
      </StandardSelect>
      <StandardTextarea
        ref={descriptionRef}
        placeholder="opis"
        required
      />
      <section className="flex gap-2 items-baseline justify-center">
        <h2 className="text-lg mt-4">Pytania {questions.length}</h2>
        <button
          type="button"
          className="text-10"
          onClick={addHandler}
        >
          <AddIcon />
        </button>
      </section>
      <article className="flex flex-col gap-2 py-2 max-h-96 overflow-y-auto scroll-smooth scrollbar-none">
        {questions.map((question: addQuestion, index) => (
          <Question
            question={question}
            updateState={setHelper}
            setState={setQuestions}
            index={index}
            key={index}
          />
        ))}
      </article>
      <StandardSubmit
        label="Dodaj"
        loading={loading}
      />
    </form>
  );
}
