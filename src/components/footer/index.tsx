import { Github, MessageCircle, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { type FC } from "react";

import { SITE_CONFIG } from "@constants";

const Footer: FC = () => {
  const t = useTranslations("Footer");
  return (
    <footer className="border-t">
      <div className="container mx-auto px-6 py-4 text-center text-white">
        <h3 className="text-xl font-bold">Let's Connect</h3>
        <p className="mt-2">Email: {SITE_CONFIG.email}</p>
        <div className="flex justify-center mt-4 space-x-2">
          <Link target="_blank" href="/twitter">
            <Twitter className="h-6 w-6" />
          </Link>
          <Link target="_blank" href="/github">
            <Github className="h-6 w-6" />
          </Link>
          <Link target="_blank" href="/discord">
            <MessageCircle className="h-6 w-6" />
          </Link>
        </div>
        <p className="mt-4 text-sm">
          © {new Date().getFullYear()} {SITE_CONFIG.name}.{" "}
          {t("allRightsReserved")}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
