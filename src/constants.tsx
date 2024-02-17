import { type ExperienceTimelineItem } from "@components/sections/experience/timeline";

import { type icons } from "lucide-react";
import {
  type NamespaceKeys,
  type NestedKeyOf,
  type useTranslations,
} from "next-intl";
import type createMiddleware from "next-intl/middleware";
import { type UrlObject } from "node:url";

interface NavigationRoute {
  id: Section;
  translationKey: TranslationKey<"Routes">;
  url: string | UrlObject;
}

export type TranslationKey<
  NestedKey extends NamespaceKeys<
    IntlMessages,
    NestedKeyOf<IntlMessages>
  > = never,
> = Parameters<ReturnType<typeof useTranslations<NestedKey>>>["0"];

export type MonthIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface Skill {
  name: string;
  level: "basic" | "skilled" | "experienced" | "advanced" | "expert";
  info?: string;
  imageUrl: string;
  bgColor?: string;
  textColor?: string;
}

export interface Project {
  name: string;
  imageUrl: string;
  description: TranslationKey<"Projects.Descriptions">;
  tags: string[];
  repoLink?: string;
}

/**
 * List of sections. Order determines the order of the fixed scroll button
 */
export const sections = [
  "intro",
  "about",
  "experience",
  "projects",
  "blog",
  "contact",
] as const;

type LocalePrefix = Parameters<typeof createMiddleware>[0]["localePrefix"];

export type Section = (typeof sections)[number];

export const SITE_CONFIG: {
  firstName: string;
  name: string;
  githubUsername: string;
  email: string;
  birthday: Date;
  location: string;
  socials: { name: string; url: string; iconName: keyof typeof icons }[];
  projects: Project[];
  experience: {
    events: (Omit<ExperienceTimelineItem, "title" | "description"> & {
      title: TranslationKey<"Experience.JobTitles">;
      description: TranslationKey<"Experience.CompanyDescriptions">;
      techStack?: string[];
    })[];
    libs: Skill[];
    languages: Skill[];
    tools: Skill[];
    platforms: Skill[];
    os: Skill[];
  };
  url: string;
  routes: NavigationRoute[];
} = {
  firstName: "Nhan",
  name: "Nhan Pham",
  email: "nhan.pham@mail.de",
  githubUsername: "Nitestack",
  birthday: new Date(2006, 2, 6),
  location: "Hamburg, DE",
  socials: [
    {
      name: "GitHub",
      url: "/github",
      iconName: "Github",
    },
    {
      name: "X",
      url: "/twitter",
      iconName: "Twitter",
    },
    {
      name: "Discord",
      url: "/discord",
      iconName: "MessageCircle",
    },
  ],
  projects: [
  ],
  experience: {
    events: [
      {
        date: "6-2022",
        duration: [2, "week"],
        title: "schoolInternship",
        company: "von Borstel GmbH",
        companyLink: "https://www.von-borstel.de",
        description: "vonBorstel",
        latest: true,
        techStack: ["PHP", "Solid.js", "TailwindCSS"],
      },
      {
        date: "6-2021",
        duration: [2, "week"],
        title: "schoolInternship",
        company: "MBJ Solutions GmbH",
        companyLink: "https://www.mbj-solutions.com",
        description: "mbjSolutions",
      },
    ],
    languages: [
      {
        name: "Javascript",
        level: "experienced",
        imageUrl: "/images/logos/javascript.svg",
        bgColor: "bg-[#F7DF1E]",
        textColor: "text-[#323330]",
      },
      {
        name: "TypeScript",
        level: "experienced",
        imageUrl: "/images/logos/typescript.svg",
        bgColor: "bg-[#3178C6]",
        textColor: "text-[#FAF9F8]",
      },
      {
        name: "HTML",
        level: "experienced",
        imageUrl: "/images/logos/html.svg",
        bgColor: "bg-[#F16529]",
      },
      {
        name: "CSS",
        level: "experienced",
        imageUrl: "/images/logos/css.svg",
        bgColor: "bg-[#2965F1]",
      },
      {
        name: "SQL",
        level: "basic",
        imageUrl: "/images/logos/sql.svg",
        bgColor: "bg-[#E48E1A]",
      },
      {
        name: "Java",
        level: "basic",
        imageUrl: "/images/logos/java.svg",
        bgColor: "bg-[#E48E1A]",
        textColor: "text-[#FAF9F8]",
      },
      {
        name: "PHP",
        level: "basic",
        imageUrl: "/images/logos/php.svg",
        bgColor: "bg-[#777BB3]",
        textColor: "text-black",
      },
      {
        name: "Dart",
        level: "basic",
        imageUrl: "/images/logos/dart.svg",
        bgColor: "bg-[#0175C2]",
        textColor: "text-[#D5D7DA]",
      },
      {
        name: "C#",
        level: "basic",
        imageUrl: "/images/logos/csharp.svg",
        bgColor: "bg-[#280068]",
      },
      {
        name: "Lua",
        level: "skilled",
        imageUrl: "/images/logos/lua.svg",
        bgColor: "bg-[#00007D]",
      },
      {
        name: "C++",
        level: "basic",
        imageUrl: "/images/logos/cpp.svg",
        bgColor: "bg-[#044F88]",
      },
    ],
    libs: [
      {
        name: "Node.js",
        level: "experienced",
        imageUrl: "/images/logos/nodejs.svg",
        bgColor: "bg-[#339933]",
        textColor: "text-[#333333]",
      },
      {
        name: "discord.js",
        level: "skilled",
        imageUrl: "/images/logos/discordjs.svg",
        bgColor: "bg-[#5865F2]",
      },
      {
        name: "MongoDB",
        level: "skilled",
        imageUrl: "/images/logos/mongodb.svg",
        bgColor: "bg-[#001E2B]",
        textColor: "text-[#00ED64]",
      },
      {
        name: "PUG",
        level: "skilled",
        imageUrl: "/images/logos/pug.svg",
        bgColor: "bg-[#A86454]",
      },
      {
        name: "React",
        level: "experienced",
        imageUrl: "/images/logos/react.svg",
        bgColor: "bg-[#68DCFC]",
        textColor: "text-black",
      },
      {
        name: "Next.js",
        level: "experienced",
        imageUrl: "/images/logos/nextjs.svg",
      },
      {
        name: "Tailwind CSS",
        level: "experienced",
        imageUrl: "/images/logos/tailwindcss.svg",
        bgColor: "bg-[#40BCFC]",
        textColor: "text-black",
      },
      {
        name: "Prisma",
        level: "experienced",
        imageUrl: "/images/logos/prisma.svg",
        bgColor: "bg-[#2D3748]",
      },
      {
        name: "Vite",
        level: "basic",
        imageUrl: "/images/logos/vite.svg",
        bgColor: "bg-[#BD34FE]",
        textColor: "text-[#FAF9F8]",
      },
      {
        name: "Solid.js",
        level: "skilled",
        imageUrl: "/images/logos/solid.svg",
        bgColor: "bg-[#2C4F7C]",
      },
      {
        name: "Flutter",
        level: "basic",
        imageUrl: "/images/logos/flutter.svg",
        bgColor: "bg-[#027DFD]",
      },
    ],
    tools: [
      {
        name: "VSCode",
        level: "experienced",
        imageUrl: "/images/logos/vscode.svg",
        bgColor: "bg-[#0098FF]",
        textColor: "text-[#F3F3F3]",
      },
      {
        name: "Git",
        level: "skilled",
        imageUrl: "/images/logos/git.svg",
        bgColor: "bg-[#DE4C36]",
        textColor: "text-[#2F2707]",
      },
      {
        name: "GitHub",
        level: "skilled",
        imageUrl: "/images/logos/github.svg",
        bgColor: "bg-[#24292F]",
      },
      {
        name: "Neovim",
        level: "skilled",
        imageUrl: "/images/logos/neovim.svg",
        bgColor: "bg-[#69A33E]",
      },
      {
        name: "Lazygit",
        level: "skilled",
        imageUrl: "/images/logos/lazygit.png",
        bgColor: "bg-[#303030]",
      },
      {
        name: "Bash",
        level: "skilled",
        imageUrl: "/images/logos/bash.svg",
        bgColor: "bg-[#283037]",
      },
      {
        name: "PowerShell",
        level: "skilled",
        imageUrl: "/images/logos/powershell.svg",
        bgColor: "bg-[#0f1822]",
      },
      {
        name: "Zsh",
        level: "basic",
        imageUrl: "/images/logos/zsh.svg",
      },
      {
        name: "chezmoi",
        level: "skilled",
        imageUrl: "/images/logos/chezmoi.svg",
        bgColor: "bg-[#284FEB]",
        textColor: "text-[#FEFEFE]",
      },
      {
        name: "WezTerm",
        level: "skilled",
        imageUrl: "/images/logos/wezterm.svg",
        bgColor: "bg-[#182125]",
        textColor: "text-[#4E49EE]",
      },
      {
        name: "tmux",
        level: "basic",
        imageUrl: "/images/logos/tmux.svg",
        bgColor: "bg-[#3c3c3c]",
        textColor: "text-[#1bb91f]",
      },
    ],
    platforms: [
      {
        name: "Heroku",
        level: "basic",
        imageUrl: "/images/logos/heroku.svg",
        bgColor: "bg-[#430098]",
        textColor: "text-white",
      },
      {
        name: "Vercel",
        level: "skilled",
        imageUrl: "/images/logos/vercel.svg",
      },
      {
        name: "PlanetScale",
        level: "basic",
        imageUrl: "/images/logos/planetscale.svg",
      },
    ],
    os: [
      {
        name: "Windows",
        level: "skilled",
        imageUrl: "/images/logos/windows.svg",
        bgColor: "bg-[#00ADEF]",
        textColor: "text-white",
      },
      {
        name: "Ubuntu (WSL)",
        level: "basic",
        imageUrl: "/images/logos/ubuntu.svg",
        bgColor: "bg-[#f47421]",
        textColor: "text-white",
      },
      {
        name: "Arch Linux (WSL)",
        level: "basic",
        imageUrl: "/images/logos/arch.svg",
        bgColor: "bg-[#1894d4]",
        textColor: "text-white",
      },
    ],
  },
  url:
    process.env.NODE_ENV == "development"
      ? "http://localhost:3000"
      : "https://nhanpham.vercel.app",
  routes: sections
    .filter((section) => section !== "intro")
    .map<NavigationRoute>((section) => ({
      id: section,
      translationKey: section as TranslationKey<"Routes">,
      url: {
        pathname: "/",
        hash: `#${section}`,
      },
    })),
};

export const LOCALIZATION_CONFIG: {
  locales: string[];
  defaultLocale: string;
  localePrefix: LocalePrefix;
  localeMap: Record<string, string>;
} = {
  locales: ["en", "de"],
  defaultLocale: "en",
  localePrefix: "always",
  localeMap: {
    en: "English",
    de: "Deutsch",
  },
};
