import {
  Linkedin,
  Github,
  FileText,
  User,
  History,
  LayoutGrid,
  LucideIcon,
} from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { IconType } from "react-icons";
import { FaRedditAlien } from "react-icons/fa";
type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type CustomIconType = LucideIcon | IconType;

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: CustomIconType;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

// export function getMenuList(pathname: string, isAuthenticated: boolean): Group[] {
//   return [
//     {
//       groupLabel: "",
//       menus: [
//         {
//           href: "/dashboard",
//           label: "Dashboard",
//           active: pathname.includes("/dashboard"),
//           icon: LayoutGrid,
//           submenus: [],
//         },
//       ],
//     },
//     {
//       groupLabel: "Contents",
//       menus: [
//         // {
//         //   href: "",
//         //   label: "Posts",
//         //   active: pathname.includes("/posts"),
//         //   icon: SquarePen,
//         //   submenus: [
//         //     {
//         //       href: "/posts",
//         //       label: "All Posts",
//         //       active: pathname === "/posts",
//         //     },
//         //     {
//         //       href: "/posts/new",
//         //       label: "New Post",
//         //       active: pathname === "/posts/new",
//         //     },
//         //   ],
//         // },    
//         {
//           href: "/roast/leetcode",
//           label: "Leetcode Roast",
//           active: pathname.includes("/roast/leetcode"),
//           icon: SiLeetcode,
//           submenus: [],
//         }, 
//         {
//           href: "/roast/github",
//           label: "Github Roast",
//           active: pathname.includes("/roast/github"),
//           icon: Github,
//           submenus: [],
//         },
//         {
//           href: "/roast/resume",
//           label: "Resume Roast",
//           active: pathname.includes("/roast/resume"),
//           icon: FileText,
//           submenus: [],
//         },  
//         {
//           href: "/roast/linkedin",
//           label: "Linkedin Roast",
//           active: pathname.includes("/roast/linkedin"),
//           icon: Linkedin,
//           submenus: [],
//         },  
//         {
//           href: "/roast/reddit",
//           label: "Reddit Roast",
//           active: pathname.includes("/roast/reddit"),
//           icon: FaRedditAlien,
//           submenus: [],
//         }, 
//       ],
//     },
//     {
//       groupLabel: "User",
//       menus: [ 
//         {
//           href: "/user/profile",
//           label: "Your Profile",
//           active: pathname.includes("/user/profile"),
//           icon: User,
//           submenus: [],
//         },
//         {
//           href: "/user/history",
//           label: "History",
//           active: pathname.includes("/user/history"),
//           icon: History,
//           submenus: [],
//         },
//       ],
//     },
//   ];
// }

 
export function getMenuList(pathname: string, isAuthenticated: boolean): Group[] {
  const menuList: Group[] = [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/roast/leetcode",
          label: "Leetcode Roast",
          active: pathname.includes("/roast/leetcode"),
          icon: SiLeetcode,
          submenus: [],
        },
        {
          href: "/roast/github",
          label: "Github Roast",
          active: pathname.includes("/roast/github"),
          icon: Github,
          submenus: [],
        },
        {
          href: "/roast/resume",
          label: "Resume Roast",
          active: pathname.includes("/roast/resume"),
          icon: FileText,
          submenus: [],
        },
        {
          href: "/roast/linkedin",
          label: "Linkedin Roast",
          active: pathname.includes("/roast/linkedin"),
          icon: Linkedin,
          submenus: [],
        },
        {
          href: "/roast/reddit",
          label: "Reddit Roast",
          active: pathname.includes("/roast/reddit"),
          icon: FaRedditAlien,
          submenus: [],
        },
      ],
    },
  ];

  if (isAuthenticated) {
    menuList.push({
      groupLabel: "User",
      menus: [
        {
          href: "/user/profile",
          label: "Your Profile",
          active: pathname.includes("/user/profile"),
          icon: User,
          submenus: [],
        },
        {
          href: "/user/history",
          label: "History",
          active: pathname.includes("/user/history"),
          icon: History,
          submenus: [],
        },
      ],
    });
  }

  return menuList;
}
