import { prisma } from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json("Non existing endpoint");
  const data = await JSON.parse(req.body);

  try {
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: data.chapterId,
      },
      select: {
        id: true,
        owned_questions: {
          select: {
            id: true,
            question: true,
            answear: true,
          },
        },
        title: true,
        section: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json({ chapter });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ chapter: {} });
  }
}
