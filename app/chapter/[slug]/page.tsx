import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import QuestionList from "./components/QuestionList";
import prisma from "@/app/db";

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

export async function getChapter(chapterId: string) {
  try {
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
      select: {
        id: true,
        owned_questions: {
          select: {
            id: true,
            question: true,
            answear: true,
          },
        },
        title: true,
        section: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return chapter;
  } catch {
    notFound();
  }
}

export default async function Chapter({ params }: Props) {
  const chapter = await getChapter(params.slug.split("_")[2]);
  if (!chapter) notFound();
  if (chapter.owned_questions.length < 1) {
    return (
      <article className=" w-96 text-30 mt-4 flex flex-col gap-4 items-center">
        <center>
          <h1>Ten rozdział nie ma żadnych pytań.</h1>
        </center>
      </article>
    );
  }
  return <QuestionList chapter={chapter} />;
}
