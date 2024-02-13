"use client";

import { AnimatePresence, MotionDiv } from "@components/motion";
import SkillCard from "@components/sections/experience/skill-card";
import { useSkillContext } from "@components/sections/experience/skill-context";

import { type FC } from "react";

import { type Skill } from "@constants";

const SkillCategory: FC<{
  name: string;
  skills: Skill[];
}> = ({ name, skills }) => {
  const { isValid } = useSkillContext();
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
          <AnimatePresence>
            {skills
              .filter((skill) => isValid(skill.level))
              .map((skill) => (
                <SkillCard key={skill.name} {...skill} />
              ))}
          </AnimatePresence>
        </div>
      </div>
    </MotionDiv>
  );
};

export default SkillCategory;
