import { ChapterCardType, getChapters } from "@/app/page";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditChapter from "./components/EditChapter";

export default async function UserChapters() {
  const chapters = await getChapters();
  if (!chapters) notFound();
  return (
    <>
      <article className="max-h-[44rem] overflow-y-auto scrollbar-none mt-4">
        {chapters.map((chapter: ChapterCardType) => (
          <EditChapter
            chapter={chapter}
            key={chapter.id}
          />
        ))}
      </article>
      <center className="mt-8">
        <Link
          href="/add"
          replace
          className="bg-10 py-1 px-4 rounded text-30"
        >
          Dodaj Rozdział
        </Link>
      </center>
    </>
  );
}
