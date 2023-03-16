import { ChapterCardType, getChapters } from "@/app/page";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditChapter from "./components/EditChapter";

export default async function UserChapters() {
  const chapters = await getChapters();
  if (!chapters) notFound();
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
          className="px-4 py-1 bg-10 rounded"
          href="/add"
          replace
        >
          Dodaj Rozdział
        </Link>
      </section>
    </>
  );
}
