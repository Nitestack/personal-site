"use client";

import {
  type FC,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { getStarRating } from "@utils";

import { type Skill } from "@constants";

interface SkillContextType {
  filteredStars: number[];
  toggleStar: (star: number) => () => void;
  isFiltered: (star: number) => boolean;
  isValid: (level: Skill["level"]) => boolean;
}

const SkillContext = createContext<SkillContextType | null>(null);

export const SkillContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filteredStars, setFilteredStars] = useState([1, 2, 3, 4, 5]);

  const toggleStar = useCallback(
    (star: number) => {
      return () => {
        if (filteredStars.includes(star)) {
          setFilteredStars((currentStars) =>
            currentStars.filter((s) => s !== star),
          );
        } else {
          setFilteredStars((currentStars) => [...currentStars, star]);
        }
      };
    },
    [filteredStars],
  );
  const isFiltered = useCallback(
    (star: number) => filteredStars.includes(star),
    [filteredStars],
  );
  const isValid = useCallback(
    (level: Skill["level"]) => filteredStars.includes(getStarRating(level)),
    [filteredStars],
  );

  return (
    <SkillContext.Provider
      value={{ isValid, isFiltered, filteredStars, toggleStar }}
    >
      {children}
    </SkillContext.Provider>
  );
};

export function useSkillContext() {
  const context = useContext(SkillContext);

  if (context === null) {
    throw new Error(
      "useSkillContext must be inside of <SkillContextProvider />",
    );
  }

  return context;
}
