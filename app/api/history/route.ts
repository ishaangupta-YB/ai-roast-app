import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import {
  HistoryTable,
  getAllHistories,
  createHistory,
  deleteHistory,
} from "@/services/serverActions";
import { ServerActionError } from "@/lib/errors";

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
    const histories = await getAllHistories(userId);
    return NextResponse.json(histories);
  } catch (error) {
    const statusCode = error instanceof ServerActionError ? error.statusCode : 500;
    return NextResponse.json({ message: (error as Error).message }, { status: statusCode });
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
    
    const history = await createHistory(type as HistoryTable, {
      userId,
      inputType: inputType || "",
      inputData: inputData || "",
      outputData: outputData || "",
      username: username || "",
      roastTone: roastTone || "FRIENDLY",
      roleType: roleType || "GENERAL",
      language: language || "ENGLISH",
    } as any);
    
    return NextResponse.json(history, { status: 201 });
  } catch (error) {
    const statusCode = error instanceof ServerActionError ? error.statusCode : 500;
    return NextResponse.json({ message: (error as Error).message }, { status: statusCode });
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
    
    await deleteHistory(type as HistoryTable, id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const statusCode = error instanceof ServerActionError ? error.statusCode : 500;
    return NextResponse.json({ message: (error as Error).message }, { status: statusCode });
  }
}
