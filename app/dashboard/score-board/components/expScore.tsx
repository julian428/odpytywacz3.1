"use client";

interface Props {
  users: {
    id: string;
    nickname: string;
    exp: number;
  }[];
}

export default function ExpScore({ users }: Props) {
  return (
    <table className="w-96 border text-center text-30">
      <tr className="h-4">
        <th className="border w-7">lp.</th>
        <th className="border">użytkownik</th>
        <th className="border">xp</th>
      </tr>
      <tr className="h-4">
        <td className="border  w-7">1</td>
        <td className="border">{users[0]?.nickname || "-"}</td>
        <td className="border">{users[0]?.exp || "-"}</td>
      </tr>
      <tr className="h-4">
        <td className="border w-7">2</td>
        <td className="border">{users[1]?.nickname || "-"}</td>
        <td className="border">{users[1]?.exp || "-"}</td>
      </tr>
      <tr className="h-4">
        <td className="border w-7">3</td>
        <td className="border">{users[2]?.nickname || "-"}</td>
        <td className="border">{users[2]?.exp || "-"}</td>
      </tr>
      <tr className="h-4">
        <td className="border w-7">4</td>
        <td className="border">{users[3]?.nickname || "-"}</td>
        <td className="border">{users[3]?.exp || "-"}</td>
      </tr>
      <tr className="h-4">
        <td className="border w-7">5</td>
        <td className="border">{users[4]?.nickname || "-"}</td>
        <td className="border">{users[4]?.exp || "-"}</td>
      </tr>
    </table>
  );
}
