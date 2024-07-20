import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export type HistoryTable = "githubHistory" | "leetcodeHistory" | "resumeHistory";
type HistoryData = {
  githubHistory: Prisma.GithubHistoryCreateInput;
  leetcodeHistory: Prisma.LeetcodeHistoryCreateInput;
  resumeHistory: Prisma.ResumeHistoryCreateInput;
};

function isHistoryTable(table: string): table is HistoryTable {
  return ["githubHistory", "leetcodeHistory", "resumeHistory"].includes(table);
}

export async function getAllHistories(userId: string) {
  const githubHistories = await prisma.githubHistory.findMany({
    where: { userId },
  });
  // const linkedinHistories = await prisma.linkedinHistory.findMany({ where: { userId } });
  const leetcodeHistories = await prisma.leetcodeHistory.findMany({
    where: { userId },
  });
  const resumeHistories = await prisma.resumeHistory.findMany({
    where: { userId },
  });

  return [
    ...githubHistories.map((history) => ({ ...history, type: "github" })),
    // ...linkedinHistories.map((history) => ({ ...history, type: "linkedin" })),
    ...leetcodeHistories.map((history) => ({ ...history, type: "leetcode" })),
    ...resumeHistories.map((history) => ({ ...history, type: "resume" })),
  ];
} 
export async function createHistory<T extends HistoryTable>(
  table: T,
  data: HistoryData[T]
) {
  try {
    if (!isHistoryTable(table)) {
      throw new Error("Invalid table name");
    }

    let result;
    switch (table) {
      case "githubHistory":
        result = await prisma.githubHistory.create({
          data: data as Prisma.GithubHistoryCreateInput,
        });
        break;
      case "leetcodeHistory":
        result = await prisma.leetcodeHistory.create({
          data: data as Prisma.LeetcodeHistoryCreateInput, 
        });
        break;
      case "resumeHistory":
        result = await prisma.resumeHistory.create({
          data: data as Prisma.ResumeHistoryCreateInput,
        });
        break;
      default:
        throw new Error("Invalid table name");
    }
    return result;
  } catch (error) {
    console.error("Error creating history:", error);
    throw new Error("Failed to create history");
  }
}

export async function deleteHistory(table: HistoryTable, id: string) {
  if (!isHistoryTable(table)) {
    throw new Error("Invalid table name");
  }
  try {
    let result;
    switch (table) {
      case "githubHistory":
        result = await prisma.githubHistory.delete({
          where: { id },
        });
        break;
      case "leetcodeHistory":
        result = await prisma.leetcodeHistory.delete({
          where: { id },
        });
        break;
      case "resumeHistory":
        result = await prisma.resumeHistory.delete({
          where: { id },
        });
        break;
      default:
        throw new Error("Invalid table name");
    }
    return result;
  } catch (error) {
    console.error("Error deleting history:", error);
    throw new Error("Failed to delete history");
  }
}
