import { type ExperienceTimelineItem } from "@components/ui/timeline";

import { type UrlObject } from "node:url";
import { type LocalePrefix } from "node_modules/next-intl/dist/types/src/shared/types";

interface NavigationRoute {
  id: Section;
  translationKey: keyof Messages["Routes"];
  url: string | UrlObject;
}

interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  info?: string;
  imageUrl: string;
  bgColor?: string;
  textColor?: string;
}

export const sections = [
  "intro",
  "about",
  "experience",
  "projects",
  "blog",
  "contact",
] as const;

export type Section = (typeof sections)[number];

export const SITE_CONFIG: {
  firstName: string;
  name: string;
  email: string;
  birthday: Date;
  url: string;
  routes: NavigationRoute[];
  experience: {
    events: (Omit<ExperienceTimelineItem, "title" | "description"> & {
      title: keyof Messages["Experience"]["JobTitles"];
      description: keyof Messages["Experience"]["CompanyDescriptions"];
    })[];
    skills: Skill[];
  };
} = {
  firstName: "Nhan",
  name: "Nhan Pham",
  email: "nhan.pham@mail.de",
  birthday: new Date(2006, 2, 6),
  experience: {
    events: [
      {
        date: "6-2022",
        duration: [2, "week"],
        title: "schoolInternship",
        company: "von Borstel GmbH",
        companyLink: "https://www.von-borstel.de",
        description: "mbjSolutions",
        latest: true,
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
    skills: [
      {
        name: "Javascript",
        level: "Intermediate",
        imageUrl: "/images/logos/javascript.svg",
        bgColor: "bg-[#F7DF1E]",
        textColor: "text-[#323330]",
      },
      {
        name: "TypeScript",
        level: "Intermediate",
        imageUrl: "/images/logos/typescript.svg",
        bgColor: "bg-[#3178C6]",
        textColor: "text-[#FAF9F8]",
      },
      {
        name: "Next.js",
        level: "Intermediate",
        imageUrl: "/images/logos/nextjs.svg",
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
      translationKey: section as keyof Messages["Routes"],
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
