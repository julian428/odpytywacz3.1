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
    <table className="w-96 border text-center text-30 mt-2">
      <tr className="h-4">
        <th className="border w-7">lp.</th>
        <th className="border">użytkownik</th>
        <th className="border">czas (ms)</th>
      </tr>
      <tr className="h-4">
        <td className="border w-7">1</td>
        <td className="border">{times[0]?.nickname || "-"}</td>
        <td className="border">{times[0]?.time || "-"}</td>
      </tr>
      <tr className="h-4">
        <td className="border w-7">2</td>
        <td className="border">{times[1]?.nickname || "-"}</td>
        <td className="border">{times[1]?.time || "-"}</td>
      </tr>
      <tr className="h-4">
        <td className="border w-7">3</td>
        <td className="border">{times[2]?.nickname || "-"}</td>
        <td className="border">{times[2]?.time || "-"}</td>
      </tr>
      <tr className="h-4">
        <td className="border w-7">4</td>
        <td className="border">{times[3]?.nickname || "-"}</td>
        <td className="border">{times[3]?.time || "-"}</td>
      </tr>
      <tr className="h-4">
        <td className="border w-7">5</td>
        <td className="border">{times[4]?.nickname || "-"}</td>
        <td className="border">{times[4]?.time || "-"}</td>
      </tr>
    </table>
  );
}
