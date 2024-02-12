import { MotionDiv } from "@components/motion";

import { Star } from "lucide-react";
import NextImage from "next/image";
import { type FC } from "react";

import { classNames } from "@utils";

import { type Skill } from "@constants";

function getStarRating(level: Skill["level"]) {
  switch (level) {
    case "Professional":
      return 5;
    case "Intermediate":
      return 2;
    case "Advanced":
      return 3;
    case "Expert":
      return 4;
    default:
      return 1;
  }
}

const SkillCategory: FC<{
  name: string;
  skills: Skill[];
}> = ({ name, skills }) => {
  return (
    <MotionDiv
      className="flex items-center justify-center flex-col gap-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        delay: 0.25,
      }}
    >
      <h3 className="text-xl tracking-widest uppercase">{name}</h3>
      <div className="flex md:justify-center overflow-x-auto md:overflow-x-hidden w-full rounded-xl p-1 snap-x snap-mandatory">
        <div className="flex flex-nowrap md:flex-wrap justify-center gap-2 md:gap-4 lg:gap-6">
          {skills.map((skill) => (
            <MotionDiv
              key={skill.name}
              className="cursor-pointer select-none min-w-24 snap-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
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
          ))}
        </div>
      </div>
    </MotionDiv>
  );
};

export default SkillCategory;
