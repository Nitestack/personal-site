import { type Skill } from "@constants";
import { classNames, getStarRating } from "@utils";
import { Star } from "lucide-react";
import NextImage from "next/image";
import { type FC } from "react";

import { MotionDiv } from "@components/motion";

const SkillCard: FC<Skill> = (skill) => {
  return (
    <MotionDiv
      className="min-w-24 cursor-pointer select-none snap-center"
      initial={{ opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div
        className={classNames(
          "h-full rounded-xl bg-background p-0.5 shadow-lg shadow-ring/20",
          skill.bgColor
        )}
      >
        <div className="space-y-1 rounded-t-xl bg-black p-1">
          <div className="relative flex h-14 w-full items-center justify-center">
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
                  className="h-4 w-4"
                  color="#FFF500"
                  fill="#FFF500"
                />
              ))}
            {Array(5 - getStarRating(skill.level))
              .fill(0)
              .map((_, index) => (
                <Star
                  key={`star-unfilled-${index}`}
                  className="h-4 w-4"
                  fill="none"
                />
              ))}
          </div>
        </div>
        <p
          className={classNames(
            "whitespace-nowrap rounded-b-xl p-0.5 text-center font-semibold text-foreground",
            skill.textColor
          )}
        >
          {skill.name}
        </p>
      </div>
    </MotionDiv>
  );
};

export default SkillCard;
