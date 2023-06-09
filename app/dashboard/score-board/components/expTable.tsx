"use client";

import ExpScore from "./expScore";

interface Props {
  users: {
    id: string;
    nickname: string;
    exp: number;
  }[];
}

export default function ExpTable({ users }: Props) {
  const topUsers = users;

  const n = users?.length || 0;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (topUsers[j].exp < topUsers[j + 1].exp) {
        const swap = topUsers[j];
        topUsers[j] = topUsers[j + 1];
        topUsers[j + 1] = swap;
      }
    }
  }

  return (
    <article className="flex flex-col items-center gap-2 w-full">
      <h2>Top 5 użytkowników z najwyższym xp.</h2>
      <ExpScore users={topUsers} />
    </article>
  );
}
