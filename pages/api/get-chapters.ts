import { prisma } from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const chapters = await prisma.chapter.findMany({
      where: {
        public: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        owner: true,
        section: {
          select: {
            id: true,
            name: true,
          },
        },
        likes: {
          select: {
            id: true,
            user: true,
          },
        },
        owned_questions: {
          select: {
            id: true,
            answear: true,
            question: true,
          },
        },
      },
    });
    res.status(200).json({ chapters });
  } catch (e) {
    console.log(e);
    res.status(500).json({ chapters: [] });
  }
}
