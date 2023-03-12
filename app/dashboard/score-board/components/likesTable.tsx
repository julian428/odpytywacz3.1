"use client";

import { ChapterTimesType } from "../page";
import LikesScore from "./likesScore";

interface Props {
  chapters: ChapterTimesType[];
}

export default function LikesTable({ chapters }: Props) {
  const TopChapters: any[] = chapters.map((chapter: any) => ({
    id: chapter.id,
    title: chapter.title,
    owner: chapter.owner,
    likes: chapter.likes.length,
  }));
  const n = chapters.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (TopChapters[j].likes < TopChapters[j + 1].likes) {
        const swap = TopChapters[j];
        TopChapters[j] = TopChapters[j + 1];
        TopChapters[j + 1] = swap;
      }
    }
  }
  return (
    <article className="text-30">
      <h2>Top 5 najbardziel lubianych rozdziałów.</h2>
      <LikesScore chapters={TopChapters} />
    </article>
  );
}
