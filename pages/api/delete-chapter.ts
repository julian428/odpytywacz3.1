import { prisma } from "@/app/db";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(400);
  const data = req.body;
  console.log("deleting");
  try {
    const deleteResponse = await prisma.chapter.delete({
      where: { id: data.chapterId },
    });
    console.log(`deleted chapter ${data.chapterId}`);
    return res
      .status(200)
      .json({ message: `Deleted chapter ${data.chapterId} Successfully` });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Couldn't delete chapter" });
  }
}
