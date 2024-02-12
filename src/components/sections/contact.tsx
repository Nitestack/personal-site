import Section from "@components/sections/section";

import { useTranslations } from "next-intl";
import { type FC } from "react";

const ContactSection: FC = () => {
  const t = useTranslations();
  return (
    <Section heading={t("Routes.contact")} sectionID="contact">
      <p className="tracking-wider uppercase text-2xl text-center">
        {t("All.comingSoon")}
      </p>
    </Section>
  );
};

export default ContactSection;
