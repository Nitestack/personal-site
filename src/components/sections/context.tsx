"use client";

import { MotionSection } from "@components/motion";

import {
  type ComponentPropsWithoutRef,
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

export function useSectionInView(section: string | null, threshold = 0.75) {
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
  const { ref } = useSectionInView(null);
  return (
    <MotionSection id="hero" {...props} ref={ref}>
      {children}
    </MotionSection>
  );
};
