"use client";
import StandardSelect from "@/app/ui/select";
import { useEffect, useRef, useState } from "react";
import { ChapterTimesType } from "../page";
import TableScores from "./tableScores";

interface Props {
  chaptersTimes: ChapterTimesType[];
}

export default function TimeTable({ chaptersTimes }: Props) {
  const chapterRef = useRef<HTMLSelectElement>(null);
  const [currentChapter, setCurrentCHapter] = useState(chaptersTimes[0]);

  const onChapterChangeHandler = () => {
    const selectedChapterId = chapterRef.current!.value;
    const newCurrentChapter = chaptersTimes.filter(
      (chapterTime: ChapterTimesType) => {
        return chapterTime.id === selectedChapterId;
      }
    );
    setCurrentCHapter(newCurrentChapter[0]);
  };

  return (
    <article className="flex flex-col items-center gap-2 w-full">
      <StandardSelect
        params={{ onChange: onChapterChangeHandler }}
        ref={chapterRef}
      >
        {chaptersTimes.map((chapterTime: ChapterTimesType) => {
          return (
            <option
              value={chapterTime.id}
              defaultValue={chaptersTimes[0].id}
            >
              {chapterTime.title}
            </option>
          );
        })}
      </StandardSelect>
      <h2>Top 5 najszybszych rozwiązań w danym rozdziale.</h2>
      <TableScores chapterTimes={currentChapter} />
    </article>
  );
}
