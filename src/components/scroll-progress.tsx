"use client";

import { useScroll } from "framer-motion";
import { type FC } from "react";

import { MotionDiv } from "@components/motion";

const ScrollProgress: FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <MotionDiv
      className="fixed bottom-0 inset-x-0 h-1 origin-left bg-primary z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
