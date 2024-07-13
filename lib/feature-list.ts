import { Linkedin, Github, FileText, LucideIcon } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { IconType } from "react-icons";
import { FaRedditAlien } from "react-icons/fa";
type CustomIconType = LucideIcon | IconType;

interface FeatureProps {
  title: string;
  description: string;
  href: string;
  icon: CustomIconType;
}

export const featureList: FeatureProps[] = [
  {
    title: "Roast LinkedIn",
    description:
      "Get a professional roast of your LinkedIn profile. Impress with your wit!",
    href: "/roast/linkedin",
    icon: Linkedin,
  },
  {
    title: "Roast GitHub",
    description:
      "Roast your GitHub repos and coding skills. Show off your humorous side!",
    href: "/roast/github",
    icon: Github,
  },
  {
    title: "Roast Resume",
    description:
      "Have your resume roasted for a hilarious critique. Perfect for a laugh!",
    href: "/roast/resume",
    icon: FileText,
  },
  {
    title: "Roast LeetCode",
    description:
      "Get your LeetCode solutions roasted. Coding fun with a twist!",
    href: "/roast/leetcode",
    icon: SiLeetcode,
  },
  {
    title: "Roast Reddit",
    description:
      "Roast your Reddit posts. Let’s see how you fare in the roast battleground!",
    href: "/roast/reddit",
    icon: FaRedditAlien,
  },
];
