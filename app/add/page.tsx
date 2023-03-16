import { prisma } from "../db";
import AddForm from "./components/AddForm";

export interface SectionType {
  id: string;
  name: string;
}

async function getSections() {
  try {
    const sections = await prisma.section.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return sections;
  } catch (e) {
    return [];
  }
}

export default async function AddChapterPage() {
  const sections = await getSections();
  return (
    <article className="text-center mt-4 w-full flex flex-col items-center">
      <h1 className="text-3xl underline mb-8">Dodaj Rodział</h1>
      <AddForm sections={sections} />
    </article>
  );
}
