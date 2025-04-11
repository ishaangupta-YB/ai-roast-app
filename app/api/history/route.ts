import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

type HistoryTable = "githubHistory" | "leetcodeHistory" | "resumeHistory";

function isHistoryTable(table: string): table is HistoryTable {
  return ["githubHistory", "leetcodeHistory", "resumeHistory"].includes(table);
}

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request as any);
  
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");

  if (
    typeof type !== "string" ||
    !["githubHistory", "leetcodeHistory", "resumeHistory"].includes(type)
  ) {
    return NextResponse.json({ message: "Invalid type" }, { status: 400 });
  }

  try {
    // Direct Prisma queries instead of server action
    const [githubHistories, leetcodeHistories, resumeHistories] = await Promise.all([
      prisma.githubHistory.findMany({ where: { userId } }),
      prisma.leetcodeHistory.findMany({ where: { userId } }),
      prisma.resumeHistory.findMany({ where: { userId } }),
    ]);

    const histories = [
      ...githubHistories.map((history) => ({ ...history, type: "github" })),
      ...leetcodeHistories.map((history) => ({ ...history, type: "leetcode" })),
      ...resumeHistories.map((history) => ({ ...history, type: "resume" })),
    ];
    
    return NextResponse.json(histories);
  } catch (error) {
    console.error("Error fetching histories:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to fetch histories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request as any);
  
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");

  if (
    typeof type !== "string" ||
    !["githubHistory", "leetcodeHistory", "resumeHistory"].includes(type)
  ) {
    return NextResponse.json({ message: "Invalid type" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { inputType, inputData, outputData, username, roastTone, roleType, language } = body;
    
    // Direct Prisma queries instead of server action
    let result;
    const data = {
      userId,
      inputType: inputType || "",
      inputData: inputData || "",
      outputData: outputData || "",
      username: username || "",
      roastTone: roastTone || "FRIENDLY",
      roleType: roleType || "GENERAL",
      language: language || "ENGLISH",
    };
    
    switch (type) {
      case "githubHistory":
        result = await prisma.githubHistory.create({ data: data as any });
        break;
      case "leetcodeHistory":
        result = await prisma.leetcodeHistory.create({ data: data as any });
        break;
      case "resumeHistory":
        result = await prisma.resumeHistory.create({ data: data as any });
        break;
      default:
        return NextResponse.json({ message: "Invalid table name" }, { status: 400 });
    }
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating history:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to create history" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { userId } = getAuth(request as any);
  
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");

  if (
    typeof type !== "string" ||
    !["githubHistory", "leetcodeHistory", "resumeHistory"].includes(type)
  ) {
    return NextResponse.json({ message: "Invalid type" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { id } = body;
    
    // Direct Prisma queries instead of server action
    switch (type) {
      case "githubHistory":
        await prisma.githubHistory.delete({ where: { id } });
        break;
      case "leetcodeHistory":
        await prisma.leetcodeHistory.delete({ where: { id } });
        break;
      case "resumeHistory":
        await prisma.resumeHistory.delete({ where: { id } });
        break;
      default:
        return NextResponse.json({ message: "Invalid table name" }, { status: 400 });
    }
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting ${type}:`, error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to delete history" },
      { status: 500 }
    );
  }
}
