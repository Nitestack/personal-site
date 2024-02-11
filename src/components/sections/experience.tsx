import Section from "@components/sections/section";
import ExperienceTimeline, {
  type ExperienceTimelineItem,
} from "@components/ui/timeline";

import { useTranslations } from "next-intl";
import { type FC } from "react";

import { classNames } from "@utils";

const ExperienceSection: FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations();

  const events: ExperienceTimelineItem[] = [
    {
      date: "6-2022",
      duration: [2, "week"],
      title: t("Experience.schoolInternship"),
      company: "von Borstel GmbH",
      companyLink: "https://www.von-borstel.de",
      description: t("Experience.CompanyDescriptions.vonBorstel"),
      latest: true,
    },
    {
      date: "6-2021",
      duration: [2, "week"],
      title: t("Experience.schoolInternship"),
      company: "MBJ Solutions GmbH",
      companyLink: "https://www.mbj-solutions.com",
      description: t("Experience.CompanyDescriptions.mbjSolutions"),
    },
  ];
  return (
    <Section heading={t("Routes.experience")} sectionID="experience">
      <div className="space-y-8">
        <ExperienceTimeline locale={locale} items={events} />
      </div>
    </Section>
  );
};

export default ExperienceSection;
