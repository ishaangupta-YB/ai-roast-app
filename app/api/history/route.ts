import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import {
  HistoryTable,
  getAllHistories,
  createHistory,
  deleteHistory,
} from "@/services/serverActions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  const { type } = req.query;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (
    typeof type !== "string" ||
    !["githubHistory", "leetcodeHistory", "resumeHistory"].includes(type)
  ) {
    return res.status(400).json({ message: "Invalid type" });
  }

  if (req.method === "GET") {
    const histories = await getAllHistories(userId);
    return res.json(histories);
  }

  if (req.method === "POST") {
    const { inputType, inputData, outputData } = req.body;
    try {
      const history = await createHistory(type as HistoryTable, {
        userId,
        inputType,
        inputData,
        outputData,
      });
      return res.status(201).json(history);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      await deleteHistory(type as HistoryTable, id);
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
