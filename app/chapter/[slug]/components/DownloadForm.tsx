"use client";
import StandardSubmit from "@/app/ui/submit";
import json2csv from "json2csv";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import CsvPreview from "./csvPreview";

interface Props {
  questions: {
    question: string;
    answear: string;
  }[];
}

interface Question {
  question: string;
  answear: string;
}

export default function DownloadForm({ questions }: Props) {
  const router = useRouter();

  const [csvData, setCsvData] = useState(
    json2csv.parse(questions, {
      header: false,
    })
  );

  const headersRef = useRef<HTMLInputElement>(null);
  const ascRef = useRef<HTMLInputElement>(null);
  const sortQuestionRef = useRef<HTMLInputElement>(null);

  const parseData = (event: ChangeEvent) => {
    const formating = {
      headers: headersRef.current?.checked,
      sortAsc: ascRef.current?.checked,
      sortByQuestion: sortQuestionRef.current?.checked,
    };
    const q = questions;
    q.sort((a: Question, b: Question) => {
      if (formating.sortAsc) {
        if (formating.sortByQuestion) {
          if (a.question < b.question) {
            return -1;
          }
          if (a.question > b.question) {
            return 1;
          }
          return 0;
        } else {
          if (a.answear < b.answear) {
            return -1;
          }
          if (a.answear > b.answear) {
            return 1;
          }
          return 0;
        }
      } else {
        if (formating.sortByQuestion) {
          if (a.question > b.question) {
            return -1;
          }
          if (a.question < b.question) {
            return 1;
          }
          return 0;
        } else {
          if (a.answear > b.answear) {
            return -1;
          }
          if (a.answear < b.answear) {
            return 1;
          }
          return 0;
        }
      }
    });
    const data = json2csv.parse(q, {
      header: formating.headers,
    });
    setCsvData(data);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    router.replace(`data:text/csv;charset=utf-8,${csvData}`);
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-4 items-center text-60 mt-4"
    >
      <section className="flex gap-1">
        <label htmlFor="download_form__headers">nagłówki</label>
        <input
          type="checkbox"
          id="download_form__headers"
          onChange={parseData}
          ref={headersRef}
        />
      </section>
      <section className="flex flex-col justify-evenly">
        <h2 className="font-bold">Sortowanie</h2>
        <section className="flex gap-4 justify-between">
          <aside className="flex gap-1 items-center">
            <input
              type="radio"
              name="asc-desc"
              id="sorting-asc"
              defaultChecked
              onChange={parseData}
              value="asc"
              ref={ascRef}
            />
            <label htmlFor="sorting-asc">rosnąco</label>
          </aside>
          <aside className="flex gap-1 items-center">
            <input
              type="radio"
              name="asc-desc"
              id="sorting-desc"
              value="desc"
              onChange={parseData}
            />
            <label htmlFor="sorting-desc">malejąco</label>
          </aside>
        </section>
        <section className="flex gap-4">
          <aside className="flex gap-1 items-center">
            <input
              type="radio"
              name="sort"
              id="sort-q"
              defaultChecked
              value="question"
              onChange={parseData}
              ref={sortQuestionRef}
            />
            <label htmlFor="sort-q">pytania</label>
          </aside>
          <aside className="flex gap-1 items-center">
            <input
              type="radio"
              name="sort"
              id="sort-a"
              onChange={parseData}
              value="answear"
            />
            <label htmlFor="sort-a">odpowiedzi</label>
          </aside>
        </section>
      </section>
      <CsvPreview csvData={csvData} />
      <StandardSubmit label="Pobierz" />
    </form>
  );
}
