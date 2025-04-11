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
    const [profileData, userStats, userContestData, userActivity] =
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
      console.log(hasErrors);
      throw new Error("User not found or data is incomplete");
    }

    // Ensure data is serializable by converting it to plain objects
    const sanitizeData = (obj: any): any => {
      if (obj === null || obj === undefined) {
        return obj;
      }
      
      if (typeof obj !== 'object') {
        return obj;
      }
      
      if (Array.isArray(obj)) {
        return obj.map(item => sanitizeData(item));
      }
      
      // Convert to plain object
      const result: Record<string, any> = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          result[key] = sanitizeData(obj[key]);
        }
      }
      return result;
    };

    const combinedData = {
      profile: sanitizeData(profileData.data),
      stats: sanitizeData(userStats.data),
      contest: sanitizeData(userContestData.data),
      activity: sanitizeData(userActivity.data),
    };

    if (!combinedData.profile.username || !combinedData.stats.totalSolved) {
      throw new Error("Insufficient user data available");
    }

    // Stringify and parse to ensure it's completely serializable
    const serializedData = JSON.parse(JSON.stringify(combinedData));
    return NextResponse.json(serializedData, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 404 });
    }
    return new NextResponse("An unexpected error occurred", { status: 500 });
  }
}
