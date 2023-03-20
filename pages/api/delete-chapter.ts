import { prisma } from "@/app/db";
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
    return res.json({
      message: `Deleted chapter ${data.chapterId} Successfully`,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Couldn't delete chapter" });
  }
}
