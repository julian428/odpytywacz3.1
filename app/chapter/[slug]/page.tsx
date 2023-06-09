import { notFound } from "next/navigation";
import QuestionList from "./components/QuestionList";

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
  return {
    title: `${decodeURI(titleArray[1])} | ${decodeURI(titleArray[0])}`,
  };
}

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default async function Chapter({ params }: Props) {
  let chapter: {
    owned_questions: QuestionType[];
    id: string;
    title: string;
  } = { owned_questions: [], id: "", title: "" };
  try {
    const chapterId = params.slug.split("_")[2];
    const chapterRes = await fetch(
      "https://www.odpytywacz.me/api/get-chapter",
      {
        method: "POST",
        next: { revalidate: 1 },
        body: JSON.stringify({ chapterId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const parsedChapter = await chapterRes.json();
    chapter = parsedChapter.chapter;
  } catch (e) {
    console.log(e);
    notFound();
  }
  if (chapter.owned_questions.length < 1) {
    return (
      <article>
        <center>
          <h1>Ten rozdział nie ma żadnych pytań.</h1>
        </center>
      </article>
    );
  }
  chapter = { ...chapter, owned_questions: shuffle(chapter.owned_questions) };
  return (
    <article className="mt-4">
      <QuestionList chapter={chapter} />
    </article>
  );
}
