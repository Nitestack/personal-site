import { MotionDiv } from "@/components/motion";
import Section from "@/components/sections/section";
import { SITE_CONFIG } from "@/constants";
import NixOSDesktop from "@public/images/nixos-desktop.png";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { type FC } from "react";

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
      <div className="flex flex-col gap-4 md:gap-8 lg:flex-row lg:items-center">
        <MotionDiv
          className="flex-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
        >
          <div className="border-border/40 shadow-ring dark:shadow-ring/10 relative aspect-video w-full overflow-hidden rounded-sm border-2 shadow-lg">
            <NextImage
              fill
              className="object-contain"
              src={NixOSDesktop}
              alt="Arch Linux Desktop"
            />
          </div>
        </MotionDiv>
        <div className="flex-1 overflow-x-hidden">
          <MotionDiv
            initial={{ opacity: 0, x: "100%" }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="space-y-5 text-balance"
          >
            <p>
              {t("Home.aboutMe", {
                age: calculateAge(SITE_CONFIG.birthday),
              })}
            </p>
            <p>{t("Home.aboutMyOtherHobbies")}</p>
          </MotionDiv>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
