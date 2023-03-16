import Link from "next/link";
import { ChapterCardType } from "../page";
import Likes from "./chapterCard/likes";

interface Props {
  chapter: ChapterCardType;
}

export default function ChapterCard({ chapter }: Props) {
  return (
    <section className=" w-80 h-36 bg-30 flex flex-col gap-4 rounded text-30 px-4 py-1 text-center">
      <Link
        className="flex flex-col gap-1"
        href={`/chapter/${chapter.section.name}_${chapter.title}_${chapter.id}`}
      >
        <h2 className="text-3xl">{chapter.title}</h2>
        <p>{chapter.section.name}</p>
      </Link>
      <section className="flex justify-between">
        <aside>{chapter.description}</aside>
        <aside>
          <section>{chapter.owner}</section>
          <Likes
            likes={chapter.likes}
            chapterId={chapter.id}
          />
        </aside>
      </section>
    </section>
  );
}
