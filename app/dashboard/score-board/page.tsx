import { PrismaClient } from "@prisma/client";
import TimeTable from "./components/timeTable";

export interface ChapterTimesType {
  id: string;
  title: string;
  owner: string;
  likes: {
    id: string;
  }[];
  times: {
    id: string;
    nickname: string;
    time: number;
  }[];
}

export async function getChapterTimes() {
  const prisma = new PrismaClient();
  const chaptersTimes = await prisma.chapter.findMany({
    select: {
      times: {
        select: {
          id: true,
          nickname: true,
          time: true,
        },
      },
      id: true,
      title: true,
      owner: true,
      likes: {
        select: {
          id: true,
        },
      },
    },
  });
  return chaptersTimes;
}

export default async function ScoreBoardPage() {
  const chaptersTimes = await getChapterTimes();
  return (
    <center className="mt-4">
      <TimeTable chaptersTimes={chaptersTimes} />
    </center>
  );
}
