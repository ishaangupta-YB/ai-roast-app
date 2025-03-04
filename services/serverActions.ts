"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export type HistoryTable = "githubHistory" | "leetcodeHistory" | "resumeHistory";
type HistoryData = {
  githubHistory: Prisma.GithubHistoryCreateInput;
  leetcodeHistory: Prisma.LeetcodeHistoryCreateInput;
  resumeHistory: Prisma.ResumeHistoryCreateInput;
};

// Custom error class for better error handling
export class ServerActionError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ServerActionError';
    this.statusCode = statusCode;
  }
}

function isHistoryTable(table: string): table is HistoryTable {
  return ["githubHistory", "leetcodeHistory", "resumeHistory"].includes(table);
}

/**
 * Get all histories for a specific user
 * @param userId The user ID to get histories for
 * @returns An array of all history items with their types
 */
export async function getAllHistories(userId: string) {
  try {
    const [githubHistories, leetcodeHistories, resumeHistories] = await Promise.all([
      prisma.githubHistory.findMany({ where: { userId } }),
      prisma.leetcodeHistory.findMany({ where: { userId } }),
      prisma.resumeHistory.findMany({ where: { userId } }),
    ]);

    return [
      ...githubHistories.map((history) => ({ ...history, type: "github" })),
      ...leetcodeHistories.map((history) => ({ ...history, type: "leetcode" })),
      ...resumeHistories.map((history) => ({ ...history, type: "resume" })),
    ];
  } catch (error) {
    console.error("Error fetching histories:", error);
    throw new ServerActionError("Failed to fetch histories", 500);
  }
}

/**
 * Get a specific history by ID
 * @param table The history table to query
 * @param id The ID of the history item
 * @returns The history item
 */
export async function getHistoryById<T extends HistoryTable>(table: T, id: string) {
  if (!isHistoryTable(table)) {
    throw new ServerActionError("Invalid table name", 400);
  }
  
  try {
    let result;
    switch (table) {
      case "githubHistory":
        result = await prisma.githubHistory.findUnique({ where: { id } });
        break;
      case "leetcodeHistory":
        result = await prisma.leetcodeHistory.findUnique({ where: { id } });
        break;
      case "resumeHistory":
        result = await prisma.resumeHistory.findUnique({ where: { id } });
        break;
      default:
        throw new ServerActionError("Invalid table name", 400);
    }
    
    if (!result) {
      throw new ServerActionError(`${table} with ID ${id} not found`, 404);
    }
    
    return result;
  } catch (error) {
    if (error instanceof ServerActionError) {
      throw error;
    }
    console.error(`Error fetching ${table}:`, error);
    throw new ServerActionError(`Failed to fetch ${table}`, 500);
  }
}

/**
 * Create a new history item
 * @param table The history table to create in
 * @param data The data for the new history item
 * @returns The created history item
 */
export async function createHistory<T extends HistoryTable>(
  table: T,
  data: HistoryData[T]
) {
  try {
    if (!isHistoryTable(table)) {
      throw new ServerActionError("Invalid table name", 400);
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
        throw new ServerActionError("Invalid table name", 400);
    }
    return result;
  } catch (error) {
    if (error instanceof ServerActionError) {
      throw error;
    }
    console.error("Error creating history:", error);
    throw new ServerActionError("Failed to create history", 500);
  }
}

/**
 * Update an existing history item
 * @param table The history table to update in
 * @param id The ID of the history item to update
 * @param data The updated data
 * @returns The updated history item
 */
export async function updateHistory<T extends HistoryTable>(
  table: T,
  id: string,
  data: Partial<HistoryData[T]>
) {
  if (!isHistoryTable(table)) {
    throw new ServerActionError("Invalid table name", 400);
  }
  
  try {
    let result;
    switch (table) {
      case "githubHistory":
        result = await prisma.githubHistory.update({
          where: { id },
          data: data as Partial<Prisma.GithubHistoryCreateInput>,
        });
        break;
      case "leetcodeHistory":
        result = await prisma.leetcodeHistory.update({
          where: { id },
          data: data as Partial<Prisma.LeetcodeHistoryCreateInput>,
        });
        break;
      case "resumeHistory":
        result = await prisma.resumeHistory.update({
          where: { id },
          data: data as Partial<Prisma.ResumeHistoryCreateInput>,
        });
        break;
      default:
        throw new ServerActionError("Invalid table name", 400);
    }
    return result;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new ServerActionError(`${table} with ID ${id} not found`, 404);
      }
    }
    if (error instanceof ServerActionError) {
      throw error;
    }
    console.error(`Error updating ${table}:`, error);
    throw new ServerActionError(`Failed to update ${table}`, 500);
  }
}

/**
 * Delete a history item
 * @param table The history table to delete from
 * @param id The ID of the history item to delete
 * @returns The deleted history item
 */
export async function deleteHistory(table: HistoryTable, id: string) {
  if (!isHistoryTable(table)) {
    throw new ServerActionError("Invalid table name", 400);
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
        throw new ServerActionError("Invalid table name", 400);
    }
    return result;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new ServerActionError(`${table} with ID ${id} not found`, 404);
      }
    }
    if (error instanceof ServerActionError) {
      throw error;
    }
    console.error(`Error deleting ${table}:`, error);
    throw new ServerActionError(`Failed to delete ${table}`, 500);
  }
}

/**
 * Get user statistics for all history types
 * @param userId The user ID to get statistics for
 * @returns Statistics about the user's history
 */
export async function getUserStats(userId: string) {
  try {
    const [
      githubCount,
      leetcodeCount,
      resumeCount
    ] = await Promise.all([
      prisma.githubHistory.count({ where: { userId } }),
      prisma.leetcodeHistory.count({ where: { userId } }),
      prisma.resumeHistory.count({ where: { userId } })
    ]);
    
    const totalRoasts = githubCount + leetcodeCount + resumeCount;
    
    return {
      totalRoasts,
      byType: {
        github: githubCount,
        leetcode: leetcodeCount,
        resume: resumeCount
      }
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    throw new ServerActionError("Failed to fetch user statistics", 500);
  }
}
