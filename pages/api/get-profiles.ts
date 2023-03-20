import { prisma } from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Non existing endpoint" });

  try {
    const profiles = await prisma.profile.findMany({
      select: {
        email: true,
        nickname: true,
        exp: true,
      },
    });
    return res.status(200).json({ profiles });
  } catch (e) {
    console.warn(e);
    return res.status(200).json({ profiles: [] });
  }
}
