import { SITE_CONFIG } from "@constants";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { type FC } from "react";

import { MotionDiv } from "@components/motion";
import { HeroSectionView } from "@components/sections/context";
import AppNetwork from "@public/images/app-network.png";

const HeroSection: FC = () => {
  const t = useTranslations();
  return (
    <HeroSectionView className="h-svh scroll-mt-48 text-center">
      <div className="mt-20 flex h-full flex-col items-center gap-10">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="relative aspect-video w-full max-w-3xl"
        >
          <NextImage
            className="object-contain"
            fill
            src={AppNetwork}
            alt="App Network"
          />
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-3 text-5xl font-bold tracking-wider sm:text-8xl">
            {SITE_CONFIG.name}
          </h1>
          <p className="text-balance text-xl text-muted-foreground">
            {t("All.description")}
          </p>
        </MotionDiv>
      </div>
    </HeroSectionView>
  );
};

export default HeroSection;
