"use client";

import { AnimatePresence } from "@/components/motion";
import SkillCard from "@/components/sections/experience/skill-card";
import { useSkillContext } from "@/components/sections/experience/skill-context";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { type FC } from "react";

import { type Skill } from "@/constants";

const SkillCategory: FC<{
  id: string;
  name: string;
  skills: Skill[];
}> = ({ id, name, skills }) => {
  const { isValid } = useSkillContext();
  return (
    <AccordionItem value={id} className="border-0">
      <AccordionTrigger className="justify-center gap-2">
        <h3 className="text-xl tracking-widest uppercase">{name}</h3>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex w-full snap-x snap-mandatory overflow-x-auto rounded-xl p-1 md:justify-center md:overflow-x-hidden">
          <div className="flex flex-nowrap justify-center gap-2 md:flex-wrap md:gap-4 lg:gap-6">
            <AnimatePresence>
              {skills
                .filter((skill) => isValid(skill.level))
                .map((skill) => (
                  <SkillCard key={`${id}-${skill.name}`} {...skill} />
                ))}
            </AnimatePresence>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SkillCategory;
