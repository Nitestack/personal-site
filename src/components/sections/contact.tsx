import { SITE_CONFIG } from "@constants";
import { Building2, Mail, MapPin, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { type FC } from "react";

import { Link } from "@/i18n/routing";
import LucideIcon from "@components/lucide-icon";
import { MotionDiv } from "@components/motion";
import Section from "@components/sections/section";
import { Button } from "@components/ui/button";

const ContactSection: FC = () => {
  const t = useTranslations();
  return (
    <Section
      className="min-h-fit"
      heading={t("Routes.contact")}
      sectionID="contact"
    >
      <div className="grid items-center justify-center gap-4 overflow-x-hidden px-4 text-center md:px-6 lg:gap-10">
        <MotionDiv
          className="border-border mx-auto grid max-w-sm gap-1.5 rounded-lg border p-4 text-left"
          initial={{ opacity: 0, x: "-100%" }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span className="font-medium">{SITE_CONFIG.name}</span>
          </p>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <Link
              className="font-medium hover:underline"
              href={`mailto:${SITE_CONFIG.email}`}
            >
              {SITE_CONFIG.email}
            </Link>
          </div>
          <p className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span className="font-medium">{SITE_CONFIG.location}</span>
          </p>
          {SITE_CONFIG.employer && (
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              <Link
                className="font-medium hover:underline"
                href={SITE_CONFIG.employer.url}
              >
                {SITE_CONFIG.employer.name}
              </Link>
            </div>
          )}
        </MotionDiv>
        <MotionDiv
          className="border-border flex justify-center space-x-4 rounded-lg border p-2"
          initial={{ opacity: 0, x: "100%" }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {SITE_CONFIG.socials.map(({ name, url, iconName }) => (
            <Button key={name} size="icon" variant="ghost" asChild>
              <Link target="_blank" href={url}>
                <LucideIcon name={iconName} className="h-8 w-8" />
              </Link>
            </Button>
          ))}
        </MotionDiv>
      </div>
    </Section>
  );
};

export default ContactSection;
