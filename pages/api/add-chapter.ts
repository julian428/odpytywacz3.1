import { prisma } from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "non existing endpoint" });
  const data = JSON.parse(req.body);
  try {
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
    return res.json({ message: "Success" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "something went wrong" });
  }
}
