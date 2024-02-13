import { MotionDiv } from "@components/motion";

import { Star } from "lucide-react";
import NextImage from "next/image";
import { type FC } from "react";

import { classNames, getStarRating } from "@utils";

import { type Skill } from "@constants";

const SkillCard: FC<Skill> = (skill) => {
  return (
    <MotionDiv
      key={skill.name}
      className="cursor-pointer select-none min-w-24 snap-center"
      initial={{ opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div
        className={classNames(
          "bg-background h-full p-0.5 rounded-xl shadow-lg shadow-ring/20",
          skill.bgColor,
        )}
      >
        <div className="bg-black rounded-t-xl p-1 space-y-1">
          <div className="relative h-14 w-full flex items-center justify-center">
            <NextImage
              className="object-contain"
              fill
              src={skill.imageUrl}
              alt={skill.name}
            />
          </div>
          <div className="flex items-center justify-center gap-0.5">
            {Array(getStarRating(skill.level))
              .fill(0)
              .map((_, index) => (
                <Star
                  key={`star-filled-${index}`}
                  className="w-4 h-4"
                  color="#FFF500"
                  fill="#FFF500"
                />
              ))}
            {Array(5 - getStarRating(skill.level))
              .fill(0)
              .map((_, index) => (
                <Star
                  key={`star-unfilled-${index}`}
                  className="w-4 h-4"
                  fill="none"
                />
              ))}
          </div>
        </div>
        <p
          className={classNames(
            "text-foreground whitespace-nowrap rounded-b-xl p-0.5 text-center font-semibold",
            skill.textColor,
          )}
        >
          {skill.name}
        </p>
      </div>
    </MotionDiv>
  );
};

export default SkillCard;
