import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");
  if (!username) {
    return new NextResponse("Username is required", { status: 400 });
  }
  const currentYear = new Date().getFullYear();
  try {
    const [profileData, userStats, userContestData,userActivity] =
      await Promise.all([
        axios.get(`https://alfa-leetcode-api.onrender.com/${username}`),
        axios.get(
          `https://alfa-leetcode-api.onrender.com/userProfile/${username}`
        ),
        axios.get(`https://alfa-leetcode-api.onrender.com/${username}/contest`),
        axios.get(
          `https://alfa-leetcode-api.onrender.com/userProfileCalendar?username=${username}&year=${currentYear}`
        ),
      ]);

    const hasErrors = [
      profileData,
      userStats,
      userContestData,
      userActivity,
    ].some(
      (response) =>
        response.data.errors || Object.keys(response.data).length === 0
    );

    if (hasErrors) {
      console.log(hasErrors)
      throw new Error("User not found or data is incomplete");
    }

    const combinedData = {
      profile: profileData.data,
      stats: userStats.data,
      contest: userContestData.data,
      activity: userActivity.data,
    };

    if (!combinedData.profile.username || !combinedData.stats.totalSolved) {
      throw new Error("Insufficient user data available");
    }

    return NextResponse.json(combinedData, { status: 200 });
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 404 });
    }
    return new NextResponse("An unexpected error occurred", { status: 500 });
  }
}
