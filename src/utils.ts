import { SITE_CONFIG } from "@constants";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Skill } from "@constants";
import type { ClassValue } from "clsx";

/**
 * Converts all class names into one class string
 * @param classLists The class(es)
 */
export function classNames(...classLists: ClassValue[]) {
  return twMerge(clsx(classLists));
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function keysFromObject<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

export function getAvatarFallback(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function getGitHubRepositoryUrl(name: string, user?: string) {
  return user
    ? `https://github.com/${user}/${name}`
    : `https://github.com/${SITE_CONFIG.githubUsername}/${name}`;
}

export function getStarRating(level: Skill["level"]) {
  switch (level) {
    case "expert":
      return 5;
    case "advanced":
      return 4;
    case "experienced":
      return 3;
    case "skilled":
      return 2;
    default:
      return 1;
  }
}
