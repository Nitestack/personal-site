"use client";

import { useScroll } from "framer-motion";
import { type FC } from "react";

import { MotionDiv } from "@components/motion";

const ScrollProgress: FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <MotionDiv
      className="fixed inset-x-0 bottom-0 z-50 h-1 origin-left bg-primary"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
