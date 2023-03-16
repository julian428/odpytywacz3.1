"use client";

import { ChapterTimesType } from "../page";

interface Props {
  chapterTimes: ChapterTimesType;
}

export default function TableScores({ chapterTimes }: Props) {
  let n = 0;
  let times = [{ id: "-", nickname: "-", time: 0 }];

  if (chapterTimes?.times) {
    n = chapterTimes.times.length;
    times = chapterTimes.times;
  }

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (times[j].time > times[j + 1].time) {
        const temp = times[j];
        times[j] = times[j + 1];
        times[j + 1] = temp;
      }
    }
  }
  return (
    <table className="w-full max-w-xs">
      <tr>
        <th className="w-7">lp.</th>
        <th>użytkownik</th>
        <th>czas (ms)</th>
      </tr>
      <tr>
        <td className="w-7">1</td>
        <td>{times[0]?.nickname || "-"}</td>
        <td>{times[0]?.time || "-"}</td>
      </tr>
      <tr>
        <td className="w-7">2</td>
        <td>{times[1]?.nickname || "-"}</td>
        <td>{times[1]?.time || "-"}</td>
      </tr>
      <tr>
        <td className="w-7">3</td>
        <td>{times[2]?.nickname || "-"}</td>
        <td>{times[2]?.time || "-"}</td>
      </tr>
      <tr>
        <td className="w-7">4</td>
        <td>{times[3]?.nickname || "-"}</td>
        <td>{times[3]?.time || "-"}</td>
      </tr>
      <tr>
        <td className="w-7">5</td>
        <td>{times[4]?.nickname || "-"}</td>
        <td>{times[4]?.time || "-"}</td>
      </tr>
    </table>
  );
}
