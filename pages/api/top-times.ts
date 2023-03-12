import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Non existing endpoint" });
  const prisma = new PrismaClient();
  const data = await JSON.parse(req.body);
  const chapterTimes = await prisma.topTime.findMany({
    where: {
      chapter_id: data.chapterId,
    },
  });
  if (chapterTimes.length < 10) {
    const addedTime = await prisma.topTime.create({
      data: {
        nickname: data.user,
        time: data.time,
        chapter_id: data.chapterId,
      },
    });
    return res.status(201).json({ message: "Added time to database" });
  }
  let worstTime = { time: chapterTimes[0].time, id: chapterTimes[0].id };
  for (let i = 1; i < chapterTimes.length; i++) {
    if (chapterTimes[i].time > worstTime.time)
      worstTime = { time: chapterTimes[i].time, id: chapterTimes[i].id };
  }
  if (data.time > worstTime)
    return res.status(200).json({ message: "User time is to slow" });

  const updatedTime = await prisma.topTime.update({
    where: {
      id: worstTime.id,
    },
    data: {
      nickname: data.user,
      time: data.time,
    },
  });

  return res.status(200).json({ message: "Added time" });
}
