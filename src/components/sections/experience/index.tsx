import LegendStar from "@/components/sections/experience/legend-star";
import SkillCategory from "@/components/sections/experience/skill-category";
import { SkillContextProvider } from "@/components/sections/experience/skill-context";
import ExperienceTimeline from "@/components/sections/experience/timeline";
import Section from "@/components/sections/section";
import { Accordion } from "@/components/ui/accordion";
import { SITE_CONFIG } from "@/constants";
import { useTranslations } from "next-intl";
import { type FC } from "react";

import type { Skill } from "@/constants";

const ExperienceSection: FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations();

  const skillCategories: { id: string; name: string; skills: Skill[] }[] = [
    {
      id: "languages",
      name: t("Experience.Skills.languages"),
      skills: SITE_CONFIG.experience.languages,
    },
    {
      id: "libs",
      name: t("Experience.Skills.libs"),
      skills: SITE_CONFIG.experience.libs,
    },
    {
      id: "tools",
      name: t("Experience.Skills.tools"),
      skills: SITE_CONFIG.experience.tools,
    },
    {
      id: "os",
      name: t("Experience.Skills.os"),
      skills: SITE_CONFIG.experience.os,
    },
  ].filter((category) => category.skills.length > 0);

  const isEmpty =
    skillCategories.flatMap((category) => category.skills).length === 0;

  return (
    <Section heading={t("Routes.experience")} sectionID="experience">
      <SkillContextProvider>
        <div className="space-y-12">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-start md:justify-start">
            <ExperienceTimeline
              locale={locale}
              items={SITE_CONFIG.experience.events.map(
                ({ title, description, techStack, ...restEvent }) => ({
                  ...restEvent,
                  title: t(`Experience.JobTitles.${title}`),
                  description: t(
                    `Experience.CompanyDescriptions.${description}`
                  ),
                  tags: techStack,
                })
              )}
            />
            {!isEmpty && (
              <div className="flex w-full items-center justify-center md:w-fit">
                <div className="border-border flex w-full flex-col gap-1 overflow-x-hidden rounded-lg border px-3 py-4 md:w-fit">
                  <LegendStar stars={1} label={t("Experience.Levels.basic")} />
                  <LegendStar
                    stars={2}
                    label={t("Experience.Levels.skilled")}
                  />
                  <LegendStar
                    stars={3}
                    label={t("Experience.Levels.experienced")}
                  />
                  <LegendStar
                    stars={4}
                    label={t("Experience.Levels.advanced")}
                  />
                  <LegendStar stars={5} label={t("Experience.Levels.expert")} />
                </div>
              </div>
            )}
          </div>
          <Accordion
            type="multiple"
            defaultValue={skillCategories.map(({ id }) => id)}
          >
            {skillCategories.map(({ id, name, skills }) => (
              <SkillCategory key={id} id={id} name={name} skills={skills} />
            ))}
          </Accordion>
        </div>
      </SkillContextProvider>
    </Section>
  );
};

export default ExperienceSection;
