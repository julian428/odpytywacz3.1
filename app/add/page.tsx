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
    <article className="text-30 text-center">
      <h1 className="text-2xl border-b">Dodaj Rodział</h1>
      <AddForm sections={sections} />
    </article>
  );
}
