import { notFound } from "next/navigation";

interface Props {
  chapters: {
    id: string;
    title: string;
    owner: string;
    likes: number;
  }[];
}

export default function LikesScore({ chapters }: Props) {
  if (chapters.length < 1) notFound();
  return (
    <table className="w-full max-w-xs">
      <tr>
        <th className="w-7">lp.</th>
        <th>rozdział</th>
        <th>twórca</th>
        <th>polubienia</th>
      </tr>
      <tr>
        <td className="w-7">1</td>
        <td>{chapters[0]?.title || "-"}</td>
        <td>{chapters[0]?.owner || "-"}</td>
        <td>{chapters[0]?.likes || "-"}</td>
      </tr>
      <tr>
        <td className="w-7">2</td>
        <td>{chapters[1]?.title || "-"}</td>
        <td>{chapters[1]?.owner || "-"}</td>
        <td>{chapters[1]?.likes || "-"}</td>
      </tr>
      <tr>
        <td className="w-7">3</td>
        <td>{chapters[2]?.title || "-"}</td>
        <td>{chapters[2]?.owner || "-"}</td>
        <td>{chapters[2]?.likes || "-"}</td>
      </tr>
      <tr>
        <td className="w-7">4</td>
        <td>{chapters[3]?.title || "-"}</td>
        <td>{chapters[3]?.owner || "-"}</td>
        <td>{chapters[3]?.likes || "-"}</td>
      </tr>
      <tr>
        <td className="w-7">5</td>
        <td>{chapters[4]?.title || "-"}</td>
        <td>{chapters[4]?.owner || "-"}</td>
        <td>{chapters[4]?.likes || "-"}</td>
      </tr>
    </table>
  );
}
