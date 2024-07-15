type HarmCategory =
  | "HARM_CATEGORY_HARASSMENT"
  | "HARM_CATEGORY_HATE_SPEECH"
  | "HARM_CATEGORY_SEXUALLY_EXPLICIT"
  | "HARM_CATEGORY_DANGEROUS_CONTENT";
type HarmBlockThreshold =
  | "HARM_BLOCK_THRESHOLD_UNSPECIFIED"
  | "BLOCK_LOW_AND_ABOVE"
  | "BLOCK_MEDIUM_AND_ABOVE"
  | "BLOCK_ONLY_HIGH"
  | "BLOCK_NONE";

export enum Tones {
  SoftHearted = "soft-hearted",
  HardHearted = "hard-hearted",
  Light = "light",
  Dark = "dark",
  Vulgar = "vulgar",
}

export const safetySettings: Array<{
  category: HarmCategory;
  threshold: HarmBlockThreshold;
}> = [
  { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
  { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
  { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
  { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
];

export enum Roles {
  Memer = "Memer",
  JobInterviewer = "Job Interviewer",
  StandupComedian = "Standup Comedian",
  HR = "HR",
  Friend = "Friend",
  FamilyMember = "Family Member",
  AshneerGrover = "Ashneer Grover",
  Teacher = "Teacher",
  Enemy = "Enemy",
  Girlfriend = "Girlfriend",
  Boyfriend = "Boyfriend",
}

export enum Languages {
  English = "English",
  Hindi = "Hindi",
  BothHindiAndEnglish = "Both Hindi and English",
}

export const constants = {
  Tones,
  Roles,
  Languages,
  safetySettings,
};
