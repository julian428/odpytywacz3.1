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

async function getUsers() {
  const users = await prisma.profile.findMany({
    select: {
      id: true,
      nickname: true,
      exp: true,
    },
  });
  return users;
}

export default async function ScoreBoardPage() {
  const chapters = await getChapters();
  const users = await getUsers();
  return (
    <center className="mt-4 flex flex-col gap-8">
      <TimeTable chaptersTimes={chapters} />
      <hr />
      <LikesTable chapters={chapters} />
      <hr />
      <ExpTable users={users} />
    </center>
  );
}
