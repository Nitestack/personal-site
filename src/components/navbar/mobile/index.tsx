import MobileLanguageSelection from "@components/navbar/mobile/language-selection";
import MobileThemeSelection from "@components/navbar/mobile/theme-selection";
import { Button } from "@components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";

import { Link } from "@navigation";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { type FC } from "react";

import { SITE_CONFIG } from "@constants";

import Logo from "@public/images/logo.png";

const MobileSidebar: FC = () => {
  const t = useTranslations();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="shadow-none" size="icon" variant="ghost">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-0" side="left">
        <SheetHeader>
          <SheetTitle className="pb-5 flex items-center justify-center gap-2 border-b border-border/40">
            <NextImage
              alt={SITE_CONFIG.name}
              width={36}
              height={36}
              src={Logo}
            />
            <Link className="text-2xl font-bold" href="/">
              {SITE_CONFIG.name}
            </Link>
          </SheetTitle>
          <SheetDescription className="space-y-4">
            <div className="space-y-2">
              {SITE_CONFIG.routes.map((route) => (
                <Button
                  className="w-full text-xl tracking-wider font-bold shadow-none border-none rounded-none"
                  key={route.id}
                  variant="outline"
                  asChild
                >
                  <Link href={route.url}>
                    {t(`Routes.${route.translationKey}`)}
                  </Link>
                </Button>
              ))}
            </div>
            <div className="border-t border-border" />
            <MobileThemeSelection
              label={t("Settings.Theme.name")}
              lightLabel={t("Settings.Theme.light")}
              darkLabel={t("Settings.Theme.dark")}
            />
            <div className="border-t border-border" />
            <MobileLanguageSelection label={t("Settings.language")} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
