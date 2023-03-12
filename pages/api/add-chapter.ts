import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);
  const data = JSON.parse(req.body);
  const prisma = new PrismaClient();
  const chapter = await prisma.chapter.create({
    data: {
      title: data.title,
      section_id: data.section,
      description: data.description,
      owner: data.owner,
    },
  });
  if (data.questions.length) {
    const questions = await prisma.question.createMany({
      data: data.questions.map((questionObj: any) => ({
        question: questionObj.question,
        answear: questionObj.answear,
        owner_id: chapter.id,
      })),
    });
  }
  return res.status(201).json({ message: "Success" });
}
