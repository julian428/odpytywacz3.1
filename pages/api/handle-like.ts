import { prisma } from "@/app/db";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "non existing endpoint" });
  const data = await JSON.parse(req.body);
  try {
    if (data.isLiked && data.likeId) {
      const like = await prisma.like.delete({
        where: {
          id: data.likeId,
        },
      });
    } else {
      const like = await prisma.like.create({
        data: {
          chapterId: data.chapterId,
          user: data.owner,
        },
      });
    }
    return res.status(200).json({ message: "edited like successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Couldn't edit like", error });
  }
}
