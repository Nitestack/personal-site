"use client";

import { sections } from "@constants";
import { createContext, useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { MotionSection } from "@components/motion";

import type { Section } from "@constants";
import type {
  ComponentPropsWithoutRef,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
} from "react";

export interface SectionsContextType {
  activeSection: Section | null;
  setActiveSection: Dispatch<SetStateAction<Section | null>>;
  timeOfLastClick: number;
  setTimeOfLastClick: Dispatch<SetStateAction<number>>;
}

const SectionsContext = createContext<SectionsContextType | null>(null);

export const SectionsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [timeOfLastClick, setTimeOfLastClick] = useState(0);

  useEffect(() => {
    setActiveSection(
      location.hash.length && sections.includes(location.hash.slice(1))
        ? (location.hash.slice(1) as Section)
        : null
    );
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
      "useSectionsContext must be inside of <SectionsContextProvider />"
    );
  }

  return context;
}

export function useSectionInView(section: Section | null, threshold = 0.25) {
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveSection, timeOfLastClick } = useSectionsContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(section);
    }
  }, [inView, setActiveSection, timeOfLastClick, section]);

  return {
    ref,
  };
}

export const HeroSectionView: FC<
  Omit<ComponentPropsWithoutRef<typeof MotionSection>, "children"> & {
    children: ReactNode;
  }
> = ({ children, ...props }) => {
  const introSection: Section = "intro";
  const { ref } = useSectionInView(null);
  return (
    <MotionSection {...props} id={introSection} ref={ref}>
      {children}
    </MotionSection>
  );
};
