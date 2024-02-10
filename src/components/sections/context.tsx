"use client";

import {
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";

export interface SectionsContextType {
  activeSection: string | null;
  setActiveSection: Dispatch<SetStateAction<string | null>>;
  timeOfLastClick: number;
  setTimeOfLastClick: Dispatch<SetStateAction<number>>;
}

const SectionsContext = createContext<SectionsContextType | null>(null);

export const SectionsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [timeOfLastClick, setTimeOfLastClick] = useState(0);

  useEffect(() => {
    setActiveSection(location.hash.length ? location.hash.slice(1) : null);
  }, []);

  return (
    <SectionsContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastClick,
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export function useSectionsContext() {
  const context = useContext(SectionsContext);

  if (context === null) {
    throw new Error(
      "useSectionsContext must be inside of <SectionsContextProvider />",
    );
  }

  return context;
}

export function useSectionInView(section: string, threshold = 0.75) {
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveSection, timeOfLastClick } = useSectionsContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(section);
      location.hash = `#${section}`;
    }
  }, [inView, setActiveSection, timeOfLastClick, section]);

  return {
    ref,
  };
}
