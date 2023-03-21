import { prisma } from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "non existing endpoint" });

  try {
    const data = JSON.parse(req.body);
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

    if (data.deleted) {
      if (data.questions.length) {
        console.log("deleting some");
        const allQuestions = await prisma.chapter.findUnique({
          where: {
            id: data.chapterId,
          },
          select: {
            owned_questions: {
              select: {
                id: true,
              },
            },
          },
        });

        const questionIds: string[] = data.questions.map(
          (question: any) => question.id
        );

        const deleteQuestions = allQuestions?.owned_questions.filter(
          (question: any) => questionIds.includes(question.id)
        );

        if (!deleteQuestions)
          return res
            .status(500)
            .json({ message: "Couldnt get chapters to delete" });

        const deleteQuestionsRes = await prisma.$transaction(
          deleteQuestions.map((question: any) => {
            return prisma.question.delete({
              where: {
                id: question.id,
              },
            });
          })
        );
      } else {
        console.log("deleting all");
        const deleteAll = await prisma.question.deleteMany({
          where: {
            owner_id: data.chapterId,
          },
        });
      }
    }

    return res.json({ message: "successfully updated." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
