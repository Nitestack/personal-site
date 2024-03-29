import LucideIcon from "@components/lucide-icon";
import { MotionFooter } from "@components/motion";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { type FC } from "react";

import { SITE_CONFIG } from "@constants";

const Footer: FC = () => {
  const t = useTranslations("Footer");
  return (
    <MotionFooter
      className="border-t"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="container mx-auto px-6 py-4 text-center">
        <h3 className="text-xl font-bold">{new URL(SITE_CONFIG.url).host}</h3>
        <Link
          className="mt-2 text-primary hover:underline"
          href={`mailto:${SITE_CONFIG.email}`}
        >
          Email: {SITE_CONFIG.email}
        </Link>
        <div className="flex justify-center mt-4 space-x-2">
          {SITE_CONFIG.socials.map(({ name, url, iconName }) => (
            <Link key={name} target="_blank" href={url}>
              <LucideIcon name={iconName} className="w-6 h-6" />
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm">
          © {new Date().getFullYear()} {SITE_CONFIG.name}.{" "}
          {t("allRightsReserved")}.
        </p>
      </div>
    </MotionFooter>
  );
};

export default Footer;
