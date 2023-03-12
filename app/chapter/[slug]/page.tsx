import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Question from "./components/Question";

const prisma = new PrismaClient();

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
  console.log(chapterId);
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
  if (!chapter) throw new Error("Couldnt fetch chapter");
  return (
    <>
      <article className=" w-96 text-30 mt-4 flex flex-col gap-4 items-center">
        {chapter.owned_questions.map((question: QuestionType) => (
          <Question
            question={question}
            key={question.id}
          />
        ))}
      </article>
    </>
  );
}
