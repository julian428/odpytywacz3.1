import { PrismaClient } from "@prisma/client";
import AddForm from "./components/AddForm";

const prisma = new PrismaClient();

export interface SectionType {
  id: string;
  name: string;
}

export async function getSections() {
  const sections = await prisma.section.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return sections;
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
