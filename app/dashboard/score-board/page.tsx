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

export default async function ScoreBoardPage() {
  const chaptersRes = await fetch(
    "https://odpytywacz.me/api/get-chapterTimes",
    {
      method: "POST",
      next: {
        revalidate: 10,
      },
    }
  );
  const usersRes = await fetch("https://odpytywacz.me/api/get-users", {
    method: "POST",
    next: {
      revalidate: 10,
    },
  });
  const { users } = await usersRes.json();
  const { chaptersTimes } = await chaptersRes.json();

  return (
    <center className="flex flex-col max-h-[80vh] justify-between gap-4 mt-4 items-center text-center px-2 overflow-y-auto scrollbar-none">
      <TimeTable chaptersTimes={chaptersTimes} />
      <hr />
      <LikesTable chapters={chaptersTimes} />
      <hr />
      <ExpTable users={users} />
    </center>
  );
}
