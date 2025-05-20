import { SITE_CONFIG } from "@constants";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import Link from "next/link";
import { type FC } from "react";

import LucideIcon from "@components/lucide-icon";
import { MotionDiv } from "@components/motion";
import { HeroSectionView } from "@components/sections/context";
import { Button } from "@components/ui/button";
import AppNetwork from "@public/images/app-network.png";

const HeroSection: FC = () => {
  const t = useTranslations();
  return (
    <HeroSectionView className="h-svh scroll-mt-48 text-center">
      <div className="mt-8 flex h-full flex-col items-center gap-10 xl:mt-12">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="relative aspect-video w-full max-w-xl xl:max-w-3xl"
        >
          <NextImage
            className="object-contain"
            fill
            src={AppNetwork}
            alt="App Network"
          />
        </MotionDiv>
        <MotionDiv
          className="space-y-3"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold tracking-wider sm:text-8xl">
            {SITE_CONFIG.name}
          </h1>
          <p className="text-balance text-xl text-muted-foreground">
            {t("All.description")}
          </p>
          <div className="flex justify-center space-x-4 p-2">
            {SITE_CONFIG.socials.map(({ name, url, iconName }) => (
              <Button key={name} size="icon" variant="ghost" asChild>
                <Link target="_blank" href={url}>
                  <LucideIcon name={iconName} className="h-8 w-8" />
                </Link>
              </Button>
            ))}
          </div>
        </MotionDiv>
      </div>
    </HeroSectionView>
  );
};

export default HeroSection;
