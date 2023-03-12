import Link from "next/link";
import { ChapterCardType } from "../page";
import Likes from "./chapterCard/likes";

interface Props {
  chapter: ChapterCardType;
}

export default function ChapterCard({ chapter }: Props) {
  return (
    <Link
      href={`/chapter/${chapter.section.name}_${chapter.title}_${chapter.id}`}
      className="px-8 py-4 bg-30 text-60 rounded-md text-center flex flex-col w-96 h-44"
    >
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl">{chapter.title}</h2>
        <p className="text-xs border-t py-1">{chapter.section.name}</p>
      </section>
      <section className="flex justify-between pt-4">
        <aside className=" overflow-y-auto">{chapter.description}</aside>
        <aside>
          <section>{chapter.owner}</section>
          <Likes likes={chapter.likes} />
        </aside>
      </section>
    </Link>
  );
}
