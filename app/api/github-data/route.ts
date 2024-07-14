import { NextResponse } from "next/server";
import axios from "axios"; 
import cheerio from "cheerio";

const GITHUB_API_URL = "https://api.github.com/users";

interface GetCommitsParams {
  username: string;
}

interface GetCommitsResult {
  contributions: string;
}

const getCommits = async ({
  username,
}: GetCommitsParams): Promise<GetCommitsResult> => {
  const currentYear = new Date().getFullYear();
  const response = await axios.get(
    `https://github.com/users/${username}/contributions?from=${currentYear}-01-01&to=${currentYear}-12-31`
  );

  const $ = cheerio.load(response.data);
  const contributionsText = $("h2.f4.text-normal.mb-2").text();
  const contributions = contributionsText.match(/(\d+)/)?.[0] || "0";

  return {
    contributions,
  };
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");
  if (!username) {
    return new NextResponse("Username is required", { status: 400 });
  }

  try {
    const userResponse = await axios.get(`${GITHUB_API_URL}/${username}`);
    if (userResponse.status !== 200) {
      throw new Error("Invalid user");
    }
    const userData = userResponse.data;

    const [reposResponse, starredReposResponse, gistsResponse] =
      await Promise.all([
        axios.get(userData.repos_url),
        axios.get(userData.starred_url.replace("{/owner}{/repo}", "")),
        axios.get(userData.gists_url.replace("{/gist_id}", "")),
      ]);

    const commitsData = await getCommits({ username });

    const result = {
      ...userData,
      repos: reposResponse.data,
      starredRepos: starredReposResponse.data,
      gists: gistsResponse.data,
      commitsPastYear: commitsData.contributions,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return new NextResponse((error as Error).message, { status: 404 });
  }
}
