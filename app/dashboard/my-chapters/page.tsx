import { ChapterCardType } from "@/app/page";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditChapter from "./components/EditChapter";

export default async function UserChapters() {
  let chapters = [];
  try {
    const chaptersRes = await fetch("https://odpytywacz.me/api/get-chapters", {
      next: { revalidate: 1 },
    });
    chapters = await chaptersRes.json();
    chapters = chapters.chapters;
  } catch {
    notFound();
  }
  return (
    <>
      <article className="flex flex-col gap-2 mt-4 max-h-96 overflow-y-auto scrollbar-none">
        {chapters.map((chapter: ChapterCardType) => (
          <EditChapter
            chapter={chapter}
            key={chapter.id}
          />
        ))}
      </article>
      <section className="absolute bottom-2 flex w-full justify-center">
        <Link
          className="px-4 py-1 bg-10 rounded text-60"
          href="/add"
          replace
        >
          Dodaj Rozdział
        </Link>
      </section>
    </>
  );
}
