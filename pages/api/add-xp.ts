import { prisma } from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ errorMessage: "Unknown endpoint" });
  try {
    const data = await JSON.parse(req.body);

    const profile = await prisma.profile.findUnique({
      where: {
        email: data.user.email,
      },
    });
    if (!profile) {
      const newProfile = await prisma.profile.create({
        data: {
          nickname: data.user.nickname,
          email: data.user.email,
          exp: data.xp,
        },
      });
      return res.json({ message: "created profile and added xp" });
    }
    if (data.xp === 0)
      return res.status(200).json({ message: "Nothing to update" });
    const updatedProfile = await prisma.profile.update({
      where: {
        email: data.user.email,
      },
      data: {
        exp: profile.exp + data.xp,
      },
    });
    return res.json({ message: "Updated the xp", revalidated: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
