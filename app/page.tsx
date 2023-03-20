import { notFound } from "next/navigation";
import ChapterCard from "./components/ChapterCard";

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

export default async function LandingPage() {
  let chapters = [];
  try {
    const chaptersRes = await fetch("https://odpytywacz.me/api/get-chapters", {
      next: { revalidate: 10 },
    });
    chapters = await chaptersRes.json();
    chapters = chapters.chapters;
  } catch (e) {
    notFound();
  }
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
