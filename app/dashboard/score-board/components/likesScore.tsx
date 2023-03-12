interface Props {
  chapters: {
    id: string;
    title: string;
    owner: string;
    likes: number;
  }[];
}

export default function LikesScore({ chapters }: Props) {
  console.log(chapters);
  return (
    <table className="w-96 border text-center text-30">
      <tr className="h-4">
        <th className="border">lp.</th>
        <th className="border">rozdział</th>
        <th className="border">twórca</th>
        <th className="border">polubienia</th>
      </tr>
      <tr className="h-4">
        <td className="border">1</td>
        <td className="border">{chapters[0]?.title || "-"}</td>
        <td className="border">{chapters[0]?.owner || "-"}</td>
        <td className="border">{chapters[0]?.likes || "-"}</td>
      </tr>
      <tr className="h-4">
        <td className="border">2</td>
        <td className="border">{chapters[1]?.title || "-"}</td>
        <td className="border">{chapters[1]?.owner || "-"}</td>
        <td className="border">{chapters[1]?.likes || "-"}</td>
      </tr>
      <tr className="h-4">
        <td className="border">3</td>
        <td className="border">{chapters[2]?.title || "-"}</td>
        <td className="border">{chapters[2]?.owner || "-"}</td>
        <td className="border">{chapters[2]?.likes || "-"}</td>
      </tr>
      <tr className="h-4">
        <td className="border">5</td>
        <td className="border">{chapters[3]?.title || "-"}</td>
        <td className="border">{chapters[3]?.owner || "-"}</td>
        <td className="border">{chapters[3]?.likes || "-"}</td>
      </tr>
      <tr className="h-4">
        <td className="border">5</td>
        <td className="border">{chapters[4]?.title || "-"}</td>
        <td className="border">{chapters[4]?.owner || "-"}</td>
        <td className="border">{chapters[4]?.likes || "-"}</td>
      </tr>
    </table>
  );
}
