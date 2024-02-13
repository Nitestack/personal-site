"use client";

import { MotionDiv } from "@components/motion";
import { useSkillContext } from "@components/sections/experience/skill-context";
import { Checkbox } from "@components/ui/checkbox";

import { Star } from "lucide-react";
import { type FC } from "react";

const LegendStar: FC<{ stars: number; label: string }> = ({ stars, label }) => {
  const { isFiltered, toggleStar } = useSkillContext();
  return (
    <MotionDiv
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: "100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Checkbox
        className="rounded-sm h-5 w-5"
        checked={isFiltered(stars)}
        onCheckedChange={toggleStar(stars)}
      />
      <div className="flex items-center gap-0.5">
        {Array(stars)
          .fill(0)
          .map((_, index) => (
            <Star
              key={`star-filled-${index}`}
              className="w-4 h-4"
              color="#FFF500"
              fill="#FFF500"
            />
          ))}
        {Array(5 - stars)
          .fill(0)
          .map((_, index) => (
            <Star
              key={`star-unfilled-${index}`}
              className="w-4 h-4"
              fill="none"
            />
          ))}
      </div>
      <p className="">{label}</p>
    </MotionDiv>
  );
};

export default LegendStar;
