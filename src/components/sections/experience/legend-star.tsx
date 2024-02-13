"use client";

import { useSkillContext } from "@components/sections/experience/skill-context";
import { Checkbox } from "@components/ui/checkbox";

import { Star } from "lucide-react";
import { type FC } from "react";

const LegendStar: FC<{ stars: number; label: string }> = ({ stars, label }) => {
  const { isFiltered, toggleStar } = useSkillContext();
  return (
    <div className="flex items-center gap-3">
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
    </div>
  );
};

export default LegendStar;
