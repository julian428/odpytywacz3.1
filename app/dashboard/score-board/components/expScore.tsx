"use client";

import { notFound } from "next/navigation";

interface Props {
  users: {
    id: string;
    nickname: string;
    exp: number;
  }[];
}

export default function ExpScore({ users }: Props) {
  if (users.length < 1) notFound();
  return (
    <table className="w-full max-w-xs">
      <tr>
        <th className="w-7">lp.</th>
        <th>użytkownik</th>
        <th>xp</th>
      </tr>
      <tr>
        <td className="w-7">1</td>
        <td>{users[0]?.nickname || "-"}</td>
        <td>{users[0]?.exp || "-"}</td>
      </tr>
      <tr>
        <td className="w-7">2</td>
        <td>{users[1]?.nickname || "-"}</td>
        <td>{users[1]?.exp || "-"}</td>
      </tr>
      <tr>
        <td className="w-7">3</td>
        <td>{users[2]?.nickname || "-"}</td>
        <td>{users[2]?.exp || "-"}</td>
      </tr>
      <tr>
        <td className="w-7">4</td>
        <td>{users[3]?.nickname || "-"}</td>
        <td>{users[3]?.exp || "-"}</td>
      </tr>
      <tr>
        <td className="w-7">5</td>
        <td>{users[4]?.nickname || "-"}</td>
        <td>{users[4]?.exp || "-"}</td>
      </tr>
    </table>
  );
}
