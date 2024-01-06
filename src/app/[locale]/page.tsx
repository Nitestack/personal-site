import AboutSection from "@components/sections/about";
import ContactSection from "@components/sections/contact";
import ExperienceSection from "@components/sections/experience";
import ProjectsSection from "@components/sections/projects";

import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { type FC } from "react";

const HomePage: FC<{ params: { locale: string } }> = ({
  params: { locale },
}) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Routes");

  return (
    <div className="space-y-6">
      <AboutSection heading={t("about")} />
      <ExperienceSection heading={t("experience")} />
      <ProjectsSection heading={t("projects")} />
      <ContactSection heading={t("contact")} />
    </div>
  );
};

export default HomePage;
