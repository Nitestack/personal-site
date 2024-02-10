import { HeroSectionView } from "@components/sections/context";

import { useTranslations } from "next-intl";
import { type FC } from "react";

import { SITE_CONFIG } from "@constants";

const HeroSection: FC = () => {
  const t = useTranslations();
  return (
    <HeroSectionView className="h-screen">
      <h1 className="text-8xl tracking-wide font-bold text-center">
        {t("Home.HeroSection.title", {
          name: SITE_CONFIG.firstName,
        })}
      </h1>
      <p className="text-center text-xl">{t("All.description")}</p>
    </HeroSectionView>
  );
};

export default HeroSection;
