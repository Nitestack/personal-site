import Section from "@components/sections/section";

import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { type FC } from "react";

import { SITE_CONFIG } from "@constants";

import Neovim from "@public/images/neovim.png";

function calculateAge(dateOfBirth: Date) {
  const currentDate = new Date();
  let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
  const currentMonth = currentDate.getMonth();
  const birthMonth = dateOfBirth.getMonth();
  // Check if the current month is before the birthday
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth &&
      currentDate.getDate() < dateOfBirth.getDate())
  ) {
    age--;
  }
  return age;
}

const AboutSection: FC = () => {
  const t = useTranslations();
  return (
    <Section heading={t("Routes.about")} sectionID="about">
      <div className="flex gap-4 md:gap-8 flex-col lg:items-center lg:flex-row">
        <div className="flex-1">
          <div className="relative w-full aspect-video overflow-hidden rounded-sm border-2 border-border/40 shadow-lg shadow-ring dark:shadow-ring/10">
            <NextImage
              fill
              className="object-contai"
              src={Neovim}
              alt="Neovim"
            />
          </div>
        </div>
        <div className="flex-1 text-balance space-y-5">
          <p>
            {t("Home.aboutMe", {
              age: calculateAge(SITE_CONFIG.birthday),
            })}
          </p>
          <p>{t("Home.aboutMyOtherHobbies")}</p>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
