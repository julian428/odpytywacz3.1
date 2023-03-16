import { prisma } from "@/app/db";
import ExpTable from "./components/expTable";
import LikesTable from "./components/likesTable";
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

async function getChapters() {
  try {
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
  } catch (e) {
    return [];
  }
}

async function getUsers() {
  try {
    const users = await prisma.profile.findMany({
      select: {
        id: true,
        nickname: true,
        exp: true,
      },
    });
    return users;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default async function ScoreBoardPage() {
  const chapters = await getChapters();
  const users = await getUsers();
  return (
    <center className="flex flex-col max-h-[80vh] justify-between gap-4 mt-4 items-center text-center px-2 overflow-y-auto scrollbar-none">
      <TimeTable chaptersTimes={chapters} />
      <hr />
      <LikesTable chapters={chapters} />
      <hr />
      <ExpTable users={users} />
    </center>
  );
}
