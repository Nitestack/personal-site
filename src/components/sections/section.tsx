"use client";

import { MotionSection } from "@components/motion";
import { useSectionInView } from "@components/sections/context";

import { type ComponentPropsWithoutRef, type FC, type ReactNode } from "react";

import { classNames } from "@utils";

const Section: FC<
  Omit<ComponentPropsWithoutRef<typeof MotionSection>, "id" | "children"> & {
    children: ReactNode;
    sectionID: string;
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
      className={classNames(
        "scroll-mt-20 md:scroll-mt-24 min-h-screen",
        className,
      )}
      ref={ref}
      id={sectionID}
    >
      <h1 className="text-3xl mb-3 font-medium tracking-[0.5em] uppercase font-mono text-center">
        {heading}
      </h1>
      {children}
    </MotionSection>
  );
};

export default Section;
