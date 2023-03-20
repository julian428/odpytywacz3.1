import { prisma } from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(500).json({ message: "non existing endpoint" });
  try {
    const users = await prisma.profile.findMany({
      select: {
        id: true,
        nickname: true,
        exp: true,
      },
    });
    return res.status(200).json({ users });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ users: [] });
  }
}
