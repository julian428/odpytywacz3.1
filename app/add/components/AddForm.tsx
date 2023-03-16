"use client";

import StandardInput from "@/app/ui/input";
import StandardSelect from "@/app/ui/select";
import StandardTextarea from "@/app/ui/textarea";
import { SectionType } from "../page";
import { BiMessageAltAdd as AddIcon } from "react-icons/bi";
import StandardSubmit from "@/app/ui/submit";
import Question from "./Question";
import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

interface Props {
  sections: SectionType[];
}

interface addQuestion {
  question: string;
  answear: string;
}

export default function AddForm({ sections }: Props) {
  const titleRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useUser();

  const [questions, setQuestions] = useState<addQuestion[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handleValueChange = (event: ChangeEvent, index: number) => {
    let data = [...questions];
    const sIndex = (event.target as HTMLInputElement).name as
      | "question"
      | "answear";
    const value = (event.target as HTMLInputElement).value;
    data[index][sIndex] = value;
    setQuestions(data);
  };

  const addHandler = (event: MouseEvent) => {
    const newField = { question: "", answear: "" };
    setQuestions([...questions, newField]);
  };

  const removeHandler = (event: MouseEvent, index: number) => {
    let data = [...questions];
    data.splice(index, 1);
    setQuestions(data);
  };

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
      className="flex flex-col items-center gap-2 max-w-xs"
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
      />
      <section>
        <h2 className="flex justify-center items-center gap-2">
          Pytania {questions.length}
          <button
            type="button"
            onClick={addHandler}
            className="text-10 text-2xl"
          >
            <AddIcon />
          </button>
        </h2>
      </section>
      <article className="flex flex-col items-center gap-2 max-h-96 overflow-y-auto">
        {questions.map((question: addQuestion, index) => (
          <Question
            key={index}
            index={index}
            question={question}
            handleRemove={removeHandler}
            handleChange={handleValueChange}
          />
        ))}
      </article>
      <section className="absolute bottom-4">
        <StandardSubmit
          label="Stwórz"
          loading={loading}
        />
      </section>
    </form>
  );
}
