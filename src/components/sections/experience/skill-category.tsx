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
        delay: 0.5,
      }}
    >
      <h3 className="text-xl tracking-widest uppercase">{name}</h3>
      <div className="flex md:justify-center overflow-x-auto md:overflow-x-hidden w-full">
        <div className="flex flex-nowrap md:flex-wrap justify-center gap-2 md:gap-4 lg:gap-6">
          {skills.map((skill) => (
            <div className="cursor-pointer min-w-24" key={skill.name}>
              <div
                className={classNames(
                  "h-full p-0.5 rounded-xl bg-muted shadow-lg shadow-ring/20",
                  skill.bgColor,
                )}
              >
                <div className="h-16 w-full bg-black rounded-t-xl flex items-center justify-center">
                  <NextImage
                    src={skill.imageUrl}
                    alt={skill.name}
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex items-center justify-center gap-1 bg-black p-1">
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
                <p
                  className={classNames(
                    "text-white rounded-b-xl py-0.5 text-center font-semibold",
                    skill.textColor,
                  )}
                >
                  {skill.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MotionDiv>
  );
};

export default SkillCategory;
