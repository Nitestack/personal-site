"use client";

import { MotionSection } from "@components/motion";
import { useSectionInView } from "@components/sections/context";

import { type ComponentPropsWithoutRef, type FC, type ReactNode } from "react";

const Section: FC<
  Omit<
    ComponentPropsWithoutRef<typeof MotionSection>,
    "ref" | "id" | "children"
  > & {
    children: ReactNode;
    sectionID: string;
    heading: string;
  }
> = ({ heading, children, sectionID, ...props }) => {
  const { ref } = useSectionInView(sectionID);
  return (
    <MotionSection {...props} ref={ref} id={sectionID}>
      <h1 className="text-3xl mb-8 font-medium capitalize text-center">
        {heading}
      </h1>
      {children}
    </MotionSection>
  );
};

export default Section;
