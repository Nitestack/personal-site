import SkillCategory from "@components/sections/experience/skill-category";
import ExperienceTimeline from "@components/sections/experience/timeline";
import Section from "@components/sections/section";

import { useTranslations } from "next-intl";
import { type FC } from "react";

import { SITE_CONFIG } from "@constants";

const ExperienceSection: FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations();
  return (
    <Section heading={t("Routes.experience")} sectionID="experience">
      <div className="space-y-12">
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
