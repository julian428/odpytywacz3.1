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
  const chaptersRes = await fetch("http://localhost:3000/api/get-chapters", {
    next: { revalidate: 10 },
  });
  const { chapters } = await chaptersRes.json();
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
