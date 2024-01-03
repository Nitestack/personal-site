import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
