"use client";

import { MotionSection } from "@/components/motion";
import { useSectionInView } from "@/components/sections/context";

import { type ComponentPropsWithoutRef, type FC, type ReactNode } from "react";

import { type Section as SectionType } from "@/constants";
import { cn } from "@/utils";

const Section: FC<
  Omit<ComponentPropsWithoutRef<typeof MotionSection>, "id" | "children"> & {
    children: ReactNode;
    sectionID: SectionType;
    heading: string;
  }
> = ({ heading, children, sectionID, className, ...props }) => {
  const { ref } = useSectionInView(sectionID);
  return (
    <MotionSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      {...props}
      className={cn("min-h-svh scroll-mt-20 md:scroll-mt-24", className)}
      ref={ref}
      id={sectionID}
    >
      <h2 className="mb-6 text-center font-mono text-3xl font-medium tracking-[0.5em] uppercase md:mb-12">
        {heading}
      </h2>
      {children}
    </MotionSection>
  );
};

export default Section;
