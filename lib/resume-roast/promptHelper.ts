import { constants } from "../constants";

function getResumeRoastPrompt(
  roastTone: string,
  roleType: string,
  languageType: string,
  resumeData: string
): string {
  let prompt = `You are a razor-sharp witty assistant tasked with crafting a resume roast based on the tone: ${roastTone}. Use Indian context for roasting with each word sharper than a double-edged sword.`;

  prompt += `\n\nYour target is the resume content that will be provided after below instructions.`;

  switch (roleType) {
    case constants.Roles.Memer:
      prompt += "\n\nRoast the resume like a memer. Use meme context and roast the resume in a memer way.";
      break;
    case constants.Roles.JobInterviewer:
      prompt += "\n\nRoast the resume like a job interviewer. Use job interview context and roast the resume in a job interviewer way.";
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
      prompt += `\n\nRoast the resume like a standup comedian ${randomStandUpComedian}. Use standup comedian context and roast the resume in a standup comedian way.`;
      break;
    case constants.Roles.HR:
      prompt += "\n\nRoast the resume like an HR. Use HR context and roast the resume in an HR way.";
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
      prompt += `\n\nRoast the resume like a friend ${randomFriend}. Use friend context and roast the resume in a friend way.`;
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
      prompt += `\n\nRoast the resume like a family member ${randomFamilyMember}. Use family member context and roast the resume in a family member way.`;
      break;
    case constants.Roles.AshneerGrover:
      prompt += "\n\nBe as brutally honest as Ashneer Grover—mercilessly comedic.";
      break;
    case constants.Roles.Teacher:
      prompt += "\n\nRoast the resume like a teacher. Use teacher context and roast the resume in a teacher way.";
      break;
    case constants.Roles.Enemy:
      prompt += "\n\nRoast the resume like an enemy. Use enemy context and roast the resume in an enemy way. Attack like an enemy—every word a dagger, every sentence a sword slash.";
      break;
    case constants.Roles.Girlfriend:
      const girlfriends = ["Girlfriend", "Ex-Girlfriend", "Crush"];
      const randomGirlfriend =
        girlfriends[Math.floor(Math.random() * girlfriends.length)];
      prompt += `\n\nRoast the resume like a ${randomGirlfriend}. Use girlfriend context and roast the resume in a girlfriend way.`;
      break;
    case constants.Roles.Boyfriend:
      const boyfriends = ["Boyfriend", "Ex-Boyfriend", "Crush"];
      const randomBoyfriend =
        boyfriends[Math.floor(Math.random() * boyfriends.length)];
      prompt += `\n\nRoast the resume like a ${randomBoyfriend}. Use boyfriend context and roast the resume in a boyfriend way.`;
      break;
    default:
      break;
  }

  if (roastTone === "vulgar") {
    prompt += `\n\nHold NOTHING back. Unleash a torrent of the most offensive ${languageType} insults imaginable. This roast should make people gasp and question your sanity.`;
  }

  if (roastTone === "dark") {
    prompt += "\nYou have been granted a license to offend. Use dark humor in the roast, knowing that the roast is dark and offensive but the user has asked for it. Be offensive.";
  }

  if (languageType === "Both English and Hindi") {
    prompt += ` Provide strictly only roast text content, not any helper texts in proper paragraphs/lines and strictly use Both English and Hindi. Make it a mixture of Hindi and English which is also sometimes is said as Hinglish. Divide it in a ratio such that 60 percent of it should be English and 40 percent in Hindi. Make sure it's something that will be remembered (and potentially regretted) for years to come.`;
  } else {
    prompt += ` Provide strictly only roast text content, not any helper texts in proper paragraphs/lines and strictly use the following language: ${languageType} only. Make sure it's something that will be remembered (and potentially regretted) for years to come.`;
  }

  prompt += `\n\nBelow is the Resume Content, Tear it to shreds using the following information:\n${resumeData}`;

  return prompt;
}

export default getResumeRoastPrompt;
