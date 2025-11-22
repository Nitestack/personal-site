"use client";

import { MotionDiv } from "@/components/motion";
import { useScroll } from "motion/react";
import { type FC } from "react";

const ScrollProgress: FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <MotionDiv
      className="bg-primary fixed inset-x-0 bottom-0 z-50 h-1 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
