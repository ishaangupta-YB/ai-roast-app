import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/dib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  const { type } = req.query;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let model;
  switch (type) {
    case "github":
      model = prisma.githubHistory;
      break;
    case "linkedin":
      model = prisma.linkedinHistory;
      break;
    case "leetcode":
      model = prisma.leetcodeHistory;
      break;
    case "resume":
      model = prisma.resumeHistory;
      break;
    default:
      return res.status(400).json({ message: "Invalid type" });
  }

  if (req.method === "GET") {
    const histories = await model.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(histories);
  }

  if (req.method === "POST") {
    const { inputType, inputData, outputData } = req.body;
    const history = await model.create({
      data: {
        userId,
        inputType,
        inputData,
        outputData,
      },
    });
    res.status(201).json(history);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    await model.delete({ where: { id } });
    res.status(204).end();
  }
}
