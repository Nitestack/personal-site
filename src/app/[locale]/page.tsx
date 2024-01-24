import AboutSection from "@components/sections/about";
import ContactSection from "@components/sections/contact";
import ExperienceSection from "@components/sections/experience";
import ProjectsSection from "@components/sections/projects";

import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { type FC } from "react";

import { SITE_CONFIG } from "@constants";

const HomePage: FC<{ params: { locale: string } }> = ({
  params: { locale },
}) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-8xl tracking-wide font-bold text-center">
          {t("Home.HeroSection.title", {
            name: SITE_CONFIG.firstName,
          })}
        </h1>
        <p className="text-center text-xl">{t("All.description")}</p>
      </section>
      <AboutSection heading={t("Routes.about")} />
      <ExperienceSection heading={t("Routes.experience")} />
      <ProjectsSection heading={t("Routes.projects")} />
      <ContactSection heading={t("Routes.contact")} />
    </div>
  );
};

export default HomePage;
