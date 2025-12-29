import LucideIcon from "@/components/lucide-icon";
import { MotionDiv } from "@/components/motion";
import { HeroSectionView } from "@/components/sections/context";
import { Button } from "@/components/ui/button";

import Avatar from "@public/images/avatar.jpg";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import Link from "next/link";
import { type FC } from "react";

import { SITE_CONFIG } from "@/constants";

const HeroSection: FC = () => {
  const t = useTranslations();
  return (
    <HeroSectionView className="h-svh scroll-mt-48 text-center">
      <div className="mt-8 flex h-full flex-col items-center gap-14 xl:mt-12">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="relative aspect-square w-full max-w-40 overflow-hidden rounded-full sm:max-w-xs xl:max-w-md"
        >
          <NextImage
            className="object-contain"
            fill
            src={Avatar}
            alt={SITE_CONFIG.name}
          />
        </MotionDiv>
        <MotionDiv
          className="space-y-5"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold tracking-wider sm:text-8xl">
            {SITE_CONFIG.name}
          </h1>
          <p className="text-muted-foreground text-xl text-balance">
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
