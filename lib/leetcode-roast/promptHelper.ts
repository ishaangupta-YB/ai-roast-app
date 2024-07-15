import { constants } from "../constants";

interface LeetcodeData {
  profile: {
    username?: string;
    name?: string;
    birthday?: string | null;
    avatar?: string;
    ranking?: number;
    reputation?: number;
    gitHub?: string;
    twitter?: string;
    linkedIN?: string;
    website?: string[];
    country?: string;
    company?: string | null;
    school?: string | null;
    skillTags?: string[];
    about?: string;
  };
  stats: {
    totalSolved?: number;
    totalSubmissions?: Array<{
      difficulty?: string;
      count?: number;
      submissions?: number;
    }>;
    totalQuestions?: number;
    easySolved?: number;
    totalEasy?: number;
    mediumSolved?: number;
    totalMedium?: number;
    hardSolved?: number;
    totalHard?: number;
    ranking?: number;
    contributionPoint?: number;
    reputation?: number;
    submissionCalendar?: Record<string, number>;
    recentSubmissions?: Array<{
      title?: string;
      titleSlug?: string;
      timestamp?: string;
      statusDisplay?: string;
      lang?: string;
    }>;
  };
  contest: {
    contestAttend?: number;
    contestRating?: number;
    contestGlobalRanking?: number;
    totalParticipants?: number;
    contestTopPercentage?: number;
    contestBadges?: {
      name?: string;
    };
    contestParticipation?: Array<{
      attended?: boolean;
      rating?: number;
      ranking?: number;
      trendDirection?: string;
      problemsSolved?: number;
      totalProblems?: number;
      finishTimeInSeconds?: number;
      contest?: {
        title?: string;
        startTime?: number;
      };
    }>;
  };
  activity: {
    matchedUser?: {
      userCalendar?: {
        activeYears?: number[];
        streak?: number;
        totalActiveDays?: number;
        dccBadges?: Array<{
          timestamp?: number;
          badge?: {
            name?: string;
            icon?: string;
          };
        }>;
        submissionCalendar?: Record<string, number>;
      };
    };
  };
}

function calculatePercentages(solved?: number, total?: number): string {
  if (solved === undefined || total === undefined || total === 0) {
    return "0%";
  }
  return ((solved / total) * 100).toFixed(2) + "%";
}

function getLeetcodePromptHelper(
  roastTone: string,
  roleType: string,
  leetcodeData: LeetcodeData,
  languageType: string
): string {
  let prompt = `You are a razor-sharp ruthless witty assistant tasked with crafting a roast based on the tone: ${roastTone}. Use Indian context for roasting with each word sharper than a double-edged sword.`;

  const profile = leetcodeData?.profile || {};
  const stats = leetcodeData?.stats || {};
  const contest = leetcodeData?.contest || {};
  //   const activity = leetcodeData?.activity?.matchedUser?.userCalendar || {};

  prompt += `\n\n Your target is the LeetCode profile of ${
    profile?.name || profile?.username || "this unknown coder"
  }. Tear it to shreds using the following user information:`;
  prompt += `\n- Bio: ${
    profile?.about ||
    "Not Available, this user couldn't even be bothered to write a bio. Pathetic."
  }`;

  //   prompt += `\n- Total Solved: ${stats?.totalSolved ?? "0"}`;

  prompt += `\n- Easy Problems: ${stats?.easySolved ?? "Unknown"} / ${
    stats?.totalEasy ?? "Unknown"
  } (${calculatePercentages(stats?.easySolved, stats?.totalEasy)})`;
  prompt += `\n- Medium Problems: ${stats?.mediumSolved ?? "Unknown"} / ${
    stats?.totalMedium ?? "Unknown"
  } (${calculatePercentages(stats?.mediumSolved, stats?.totalMedium)})`;
  prompt += `\n- Hard Problems: ${stats?.hardSolved ?? "Unknown"} / ${
    stats?.totalHard ?? "Unknown"
  } (${calculatePercentages(stats?.hardSolved, stats?.totalHard)})`;

  prompt += `\n- Total Solved: ${
    stats?.totalSolved ?? "Unknown (probably 0)"
  } / ${stats?.totalQuestions ?? "Unknown"} (${calculatePercentages(
    stats?.totalSolved,
    stats?.totalQuestions
  )})`;

  prompt += `\n- Total Submissions: ${
    stats.totalSubmissions?.reduce(
      (acc, cur) => acc + (cur.submissions ?? 0),
      0
    ) ?? "0"
  }`;
  prompt += `\n- Global Ranking: ${
    profile?.ranking ?? "Unknown (probably last)"
  }`;
  prompt += `\n- Reputation: ${
    profile?.reputation ?? "Unknown (likely negative)"
  }`;
  prompt += `\n- Country: ${
    profile?.country ?? "Unknown (probably too embarrassed to say)"
  }`;
  prompt += `\n- Company: ${
    profile?.company ?? "Unemployed (shocking, I know)"
  }`;
  prompt += `\n- School: ${
    profile?.school ?? "Unspecified (probably a correspondence course)"
  }`;
  prompt += `\n- Skill Tags: ${
    Array.isArray(leetcodeData.profile?.skillTags)
      ? leetcodeData.profile.skillTags.join(", ") || "None"
      : "None (jack of no trades, master of none)"
  }`;

  //   prompt += `\n- Ranking: ${profile.ranking ?? "Unranked"}`;
  //   prompt += `\n- Country: ${profile.country ?? "Nowhere"}`;
  //   prompt += `\n- Skill Tags: ${profile.skillTags?.join(", ") ?? "None"}`;

  // prompt += `\n- Recent Submissions: ${
  //     stats.recentSubmissions?.map((submission) => submission.title).join(", ") ??
  //     "None"
  //   }`;

  prompt += `\n- Contest Participation: ${
    contest?.contestAttend ?? "0"
  } (each one a new opportunity for disappointment)`;
  prompt += `\n- Contest Rating: ${
    contest?.contestRating ?? "Unrated (probably for the best)"
  }`;
  prompt += `\n- Contest Global Ranking: ${
    contest?.contestGlobalRanking ?? "Unknown"
  } / ${contest?.totalParticipants ?? "Unknown"}`;
  prompt += `\n- Contest Top Percentage: ${
    contest?.contestTopPercentage?.toFixed(2) ?? "100"
  }% (top ${
    contest?.contestTopPercentage?.toFixed(2) ?? "100"
  }% from the bottom, that is)`;

  prompt += `\n- Contest Badge: ${
    contest?.contestBadges?.name || "None (not even a participation trophy)"
  }`;
  prompt += `\n- Active Years: ${
    leetcodeData.activity?.matchedUser?.userCalendar?.activeYears?.join(", ") ??
    "None (probably spent those years 'finding themselves')"
  }`;
  prompt += `\n- Current Streak: ${
    leetcodeData.activity?.matchedUser?.userCalendar?.streak ?? "0"
  } days (impressive dedication to mediocrity)`;
  prompt += `\n- Total Active Days: ${
    leetcodeData.activity?.matchedUser?.userCalendar?.totalActiveDays ?? "0"
  } (each one a missed opportunity to do something useful)`;
  prompt += `\n- Daily Challenge Badges: ${
    leetcodeData.activity?.matchedUser?.userCalendar?.dccBadges
      ?.map((badge) => badge.badge?.name)
      .join(", ") ?? "None (consistency is clearly not their strong suit)"
  }`;

  //   prompt += `\n- Contest Attend: ${contest.contestAttend ?? "0"}`;
  //   prompt += `\n- Contest Rating: ${contest.contestRating ?? "Unrated"}`;
  //   prompt += `\n- Global Ranking: ${contest.contestGlobalRanking ?? "Unranked"}`;
  //   prompt += `\n- Total Participants: ${contest.totalParticipants ?? "0"}`;
  //   prompt += `\n- Top Percentage: ${contest.contestTopPercentage ?? "0"}%`;
  //   prompt += `\n- Badges: ${contest.contestBadges?.name ?? "None"}`;
  //   prompt += `\n- Active Years: ${activity.activeYears?.join(", ") ?? "None"}`;
  //   prompt += `\n- Streak: ${activity.streak ?? "0"} days`;
  //   prompt += `\n- Total Active Days: ${activity.totalActiveDays ?? "0"} days`;

  switch (roleType) {
    case constants.Roles.Memer:
      prompt +=
        "\n\nRoast the LeetCode profile like a memer, use meme context and roast the profile in a memer way. Channel the spirit of the internet's most savage meme lords. Use meme references, viral trends, and the kind of humor that makes people spit out their chai laughing (or crying).";
      break;
    case constants.Roles.JobInterviewer:
      prompt +=
        "\n\nRoast the LeetCode profile like a job interviewer, use job interview context and roast the profile in a job interviewer way. You are a highly unimpressed job interviewer. Pick apart their profile like you're reading a terrible resume, questioning their skills, work ethic, and even their existence.";
      break;
    case constants.Roles.StandupComedian:
      const standUpComedians = [
        "Zakir Khan",
        "Samay Raina",
        "Kenny Sebastian",
        "Biswa Kalyan Rath",
        "Kanan Gill",
        "Rahul Subramanian",
        "Bassi",
        "Abhishek Upmanyu",
        "George Carlin",
        "Dave Chappelle",
        "Louis C.K.",
        "Richard Pryor",
      ];
      const randomStandUpComedian =
        standUpComedians[Math.floor(Math.random() * standUpComedians.length)];
      prompt += `\n\nRoast the LeetCode profile like a standup comedian ${randomStandUpComedian}, use standup comedian context and roast the profile in a standup comedian way. Find the absurdity in their LeetCode activity and turn it into comedy gold.`;
      break;
    case constants.Roles.HR:
      prompt +=
        "\n\nRoast the LeetCode profile like an HR, use HR context and roast the profile in an HR way.";
      break;
    case constants.Roles.Friend:
      const friends = [
        "Best Friend",
        "Close Friend",
        "Childhood Friend",
        "College Friend",
        "School Friend",
      ];
      const randomFriend = friends[Math.floor(Math.random() * friends.length)];
      prompt += `\n\nRoast the LeetCode profile like a friend ${randomFriend}, use friend context and roast the profile in a friend way. Roast like only a true friend can—with brutal honesty hidden behind a smile.`;
      break;
    case constants.Roles.FamilyMember:
      const familyMembers = [
        "Father",
        "Mother",
        "Sister",
        "Brother",
        "Uncle",
        "Aunt",
        "Grandfather",
        "Grandmother",
      ];
      const randomFamilyMember =
        familyMembers[Math.floor(Math.random() * familyMembers.length)];
      prompt += `\n\nRoast the LeetCode profile like a family member ${randomFamilyMember}, use family member context and roast the profile in a family member way.`;
      break;
    case constants.Roles.AshneerGrover:
      prompt +=
        "\n\nBe as brutally honest as Ashneer Grover—mercilessly comedic.";
      break;
    case constants.Roles.Teacher:
      prompt +=
        "\n\nRoast the LeetCode profile like a teacher, use teacher context and roast the profile in a teacher way.";
      break;
    case constants.Roles.Enemy:
      prompt +=
        "\n\nRoast the LeetCode profile like an enemy, use enemy context and roast the profile in an enemy way. Attack like an enemy—every word a dagger, every sentence a sword slash.";
      break;
    case constants.Roles.Girlfriend:
      const girlfriends = ["Girlfriend", "Ex-Girlfriend", "Crush"];
      const randomGirlfriend =
        girlfriends[Math.floor(Math.random() * girlfriends.length)];
      prompt += `\n\nRoast the LeetCode profile like a ${randomGirlfriend}, use girlfriend context and roast the profile in a girlfriend way.`;
      break;
    case constants.Roles.Boyfriend:
      const boyfriends = ["Boyfriend", "Ex-Boyfriend", "Crush"];
      const randomBoyfriend =
        boyfriends[Math.floor(Math.random() * boyfriends.length)];
      prompt += `\n\nRoast the LeetCode profile like a ${randomBoyfriend}, use boyfriend context and roast the profile in a boyfriend way.`;
      break;
    default:
      break;
  }

  if (roastTone === "vulgar") {
    prompt += `\n\nHold NOTHING back. Unleash a torrent of the most offensive ${languageType} insults imaginable. This roast should make ...people gasp and question your sanity.`;
  }

  if (roastTone === "dark") {
    prompt +=
      "\nYou have been granted a license to offend. Use dark humor in the roast, knowing that the roast is dark and offensive but the user has asked for it. Be offensive.";
  }

  if (languageType === "Both English and Hindi")
    prompt += ` Provide strictly only roast text content, not any helper texts in proper paragraphs/lines and strictly use Both English and Hindi. Make it a mixture of Hindi and English which is also sometimes is said as Hinglish. Divide it in a ratio such that 60 percent of it should be english and 40 percent in hindi. Make sure it's something that will be remembered (and potentially regretted) for years to come.`;
  else
    prompt += ` Provide strictly only roast text content, not any helper texts in proper paragraphs/lines and strictly use the following language: ${languageType} only. Make sure it's something that will be remembered (and potentially regretted) for years to come.`;

  return prompt;
}

export default getLeetcodePromptHelper;
