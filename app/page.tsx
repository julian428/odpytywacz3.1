import ChapterCard from "./components/ChapterCard";
import { prisma } from "./db";

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
  owned_questions: {
    id: string;
    answear: string;
    question: string;
  }[];
}

export async function getChapters(): Promise<ChapterCardType[]> {
  try {
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
        owned_questions: {
          select: {
            id: true,
            answear: true,
            question: true,
          },
        },
      },
    });
    return chapters;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export const revalidate = 0;

export default async function LandingPage() {
  const chapters = await getChapters();
  return (
    <>
      <article className="flex flex-col gap-4 mt-2 max-h-[90vh] overflow-y-auto scrollbar-none">
        {chapters.map((chapter: ChapterCardType) => (
          <ChapterCard
            chapter={chapter}
            key={chapter.id}
          />
        ))}
      </article>
      <center>
        <h2>{!chapters.length && "Nie znaleziono żadnych rozdziałów"}</h2>
      </center>
    </>
  );
}
