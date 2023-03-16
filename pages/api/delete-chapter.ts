import { prisma } from "@/app/db";
import { PrismaClient } from "@prisma/client";
import { Console } from "console";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);
  try {
    const data = req.body;
    const deleteResponse = await prisma.chapter.delete({
      where: { id: data.chapterId },
    });

    res.revalidate("/");
    res.revalidate("/dashboard/score-board");
    res.revalidate("/dashboard/my-chapters");
    return res
      .status(200)
      .json({ message: `Deleted chapter ${data.chapterId} Successfully` });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Couldn't delete chapter" });
  }
}
