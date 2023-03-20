import { prisma } from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(500).json("Non existing endpoint");
  try {
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
    return res.status(200).json({ chaptersTimes });
  } catch (e) {
    return res.status(500).json({ chapterTimes: [] });
  }
}
