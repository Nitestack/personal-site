import SkillCategory from "@components/sections/experience/skill-category";
import ExperienceTimeline from "@components/sections/experience/timeline";
import Section from "@components/sections/section";

import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { type FC } from "react";

import { SITE_CONFIG } from "@constants";

function renderStars(stars: number, label: string) {
  return (
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
      {label && <p className="ml-3">{label}</p>}
    </div>
  );
}

const ExperienceSection: FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations();
  return (
    <Section heading={t("Routes.experience")} sectionID="experience">
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
          <ExperienceTimeline
            locale={locale}
            items={SITE_CONFIG.experience.events.map(
              ({ title, description, ...restEvent }) => ({
                ...restEvent,
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                title: t(`Experience.JobTitles.${title}`),
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                description: t(`Experience.CompanyDescriptions.${description}`),
              }),
            )}
          />
          <div className="flex items-center justify-center w-full md:w-fit">
            <div className="flex flex-col gap-2 p-4 w-full md:w-fit rounded-lg border border-border">
              {renderStars(1, t("Experience.Levels.basic"))}
              {renderStars(2, t("Experience.Levels.skilled"))}
              {renderStars(3, t("Experience.Levels.experienced"))}
              {renderStars(4, t("Experience.Levels.advanced"))}
              {renderStars(5, t("Experience.Levels.expert"))}
            </div>
          </div>
        </div>
        <SkillCategory
          name={t("Experience.Skills.languages")}
          skills={SITE_CONFIG.experience.languages}
        />
        <SkillCategory
          name={t("Experience.Skills.libs")}
          skills={SITE_CONFIG.experience.libs}
        />
        <SkillCategory
          name={t("Experience.Skills.tools")}
          skills={SITE_CONFIG.experience.tools}
        />
        <SkillCategory
          name={t("Experience.Skills.platforms")}
          skills={SITE_CONFIG.experience.platforms}
        />
        <SkillCategory
          name={t("Experience.Skills.os")}
          skills={SITE_CONFIG.experience.os}
        />
      </div>
    </Section>
  );
};

export default ExperienceSection;
