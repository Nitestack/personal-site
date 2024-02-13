import LucideIcon from "@components/lucide-icon";
import Section from "@components/sections/section";
import { Button } from "@components/ui/button";

import { Mail, MapPin, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { type FC } from "react";

import { SITE_CONFIG } from "@constants";

const ContactSection: FC = () => {
  const t = useTranslations();
  return (
    <Section
      className="min-h-fit"
      heading={t("Routes.contact")}
      sectionID="contact"
    >
      <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="mx-auto max-w-sm grid gap-1.5 text-left rounded-lg border border-border p-4">
          <p className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span className="font-medium">{SITE_CONFIG.name}</span>
          </p>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <Link
              className="hover:underline font-medium"
              href={`mailto:${SITE_CONFIG.email}`}
            >
              {SITE_CONFIG.email}
            </Link>
          </div>
          <p className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">{SITE_CONFIG.location}</span>
          </p>
        </div>
        <div className="flex justify-center space-x-4 p-2 rounded-lg border border-border">
          {SITE_CONFIG.socials.map(({ name, url, iconName }) => (
            <Button size="icon" variant="ghost" asChild>
              <Link key={name} target="_blank" href={url}>
                <LucideIcon name={iconName} className="w-8 h-8" />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;
