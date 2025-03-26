import { SITE_CONFIG } from "@constants";
import { useTranslations } from "next-intl";
import { type FC } from "react";

import { Link } from "@/i18n/routing";
import LucideIcon from "@components/lucide-icon";
import { MotionFooter } from "@components/motion";

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
          className="text-primary mt-2 hover:underline"
          href={`mailto:${SITE_CONFIG.email}`}
        >
          Email: {SITE_CONFIG.email}
        </Link>
        <div className="mt-4 flex justify-center space-x-2">
          {SITE_CONFIG.socials.map(({ name, url, iconName }) => (
            <Link key={name} target="_blank" href={url}>
              <LucideIcon name={iconName} className="h-6 w-6" />
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
