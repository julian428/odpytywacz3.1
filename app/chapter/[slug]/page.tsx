import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import QuestionList from "./components/QuestionList";
import { prisma } from "@/app/db";

interface Props {
  params: {
    slug: string;
  };
}

export interface QuestionType {
  id: string;
  question: string;
  answear: string;
}

export async function generateMetadata({ params }: Props): Promise<any> {
  const titleArray = params.slug.split("_");
  return { title: `${titleArray[1]} | ${titleArray[0]}` };
}

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default async function Chapter({ params }: Props) {
  let chapterRes = await fetch("http://localhost:3000/api/get-chapter", {
    method: "POST",
    body: JSON.stringify({ chapterId: params.slug.split("_")[2] }),
    next: { revalidate: 10 },
  });
  let { chapter } = await chapterRes.json();
  if (!chapter) notFound();
  if (chapter.owned_questions.length < 1) {
    return (
      <article>
        <center>
          <h1>Ten rozdział nie ma żadnych pytań.</h1>
        </center>
      </article>
    );
  }
  chapter = { ...chapter, owned_questions: shuffle(chapter.owned_questions) };
  return (
    <article className="mt-4">
      <QuestionList chapter={chapter} />
    </article>
  );
}
