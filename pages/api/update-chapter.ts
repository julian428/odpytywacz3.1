import { prisma } from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "non existing endpoint" });

  try {
    const data = await JSON.parse(req.body);
    const oldQuestions = data.questions.filter((question: any) => question.id);
    const newQuestions = data.questions.filter((question: any) => !question.id);

    const updatedChapter = await prisma.chapter.update({
      where: {
        id: data.chapterId,
      },
      data: {
        title: data.title,
        description: data.description,
      },
    });

    const updatedQuestions = await prisma.$transaction(
      oldQuestions.map((question: any) =>
        prisma.question.update({
          where: {
            id: question.id,
          },
          data: {
            question: question.question,
            answear: question.answear,
          },
        })
      )
    );

    const createdQuestions = await prisma.$transaction(
      newQuestions.map((question: any) =>
        prisma.question.create({
          data: {
            owner_id: data.chapterId,
            answear: question.answear,
            question: question.question,
          },
        })
      )
    );

    res.revalidate("/dashboard/my-chapters");
    res.revalidate("/");
    return res.status(201).json({ message: "successfully updated." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
