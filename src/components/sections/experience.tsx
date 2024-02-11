import Section from "@components/sections/section";
import ExperienceTimeline from "@components/ui/timeline";

import { useTranslations } from "next-intl";
import { type FC } from "react";

import { classNames } from "@utils";

import { SITE_CONFIG } from "@constants";

const ExperienceSection: FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations();
  return (
    <Section heading={t("Routes.experience")} sectionID="experience">
      <div className="space-y-8">
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
      </div>
    </Section>
  );
};

export default ExperienceSection;
