import { PrismaClient } from "@prisma/client";
import ChapterCard from "./components/ChapterCard";

const prisma = new PrismaClient();

export interface ChapterCardType {
  id: string;
  title: string;
  description: string;
  owner: string;
  section: {
    id: string;
    name: string;
  };
  likes: {
    id: string;
    user: string;
  }[];
}

export async function getChapters(): Promise<ChapterCardType[]> {
  const chapters = await prisma.chapter.findMany({
    where: {
      public: true,
    },
    select: {
      id: true,
      title: true,
      description: true,
      owner: true,
      section: {
        select: {
          id: true,
          name: true,
        },
      },
      likes: {
        select: {
          id: true,
          user: true,
        },
      },
    },
  });
  return chapters;
}

export default async function LandingPage() {
  const chapters = await getChapters();
  return (
    <>
      <article className="flex flex-col gap-4 overflow-y-auto max-h-[44rem] scrollbar-none">
        {chapters.map((chapter: ChapterCardType) => (
          <ChapterCard
            chapter={chapter}
            key={chapter.id}
          />
        ))}
      </article>
      <center>
        <h2 className="text-30">
          {!chapters.length && "Nie znaleziono żadnych rozdziałów"}
        </h2>
      </center>
    </>
  );
}
