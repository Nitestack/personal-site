import NavbarLogo from "@components/navbar/logo";
import { MobileSidebarContextProvider } from "@components/navbar/mobile/context";
import MobileLanguageSelection from "@components/navbar/mobile/language-selection";
import MobileSidebarLink from "@components/navbar/mobile/link";
import MobileSidebarLogo from "@components/navbar/mobile/logo";
import MobileThemeSelection from "@components/navbar/mobile/theme-selection";
import { Button } from "@components/ui/button";
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { type FC } from "react";

import { SITE_CONFIG } from "@constants";

const MobileSidebar: FC = () => {
  const t = useTranslations();
  return (
    <MobileSidebarContextProvider>
      <SheetTrigger asChild>
        <Button className="shadow-none" size="icon" variant="ghost">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-0 pt-0" side="left">
        <SheetHeader>
          <SheetTitle className="px-4 py-1 flex items-center gap-2 border-b border-border/40">
            <SheetClose asChild>
              <Button className="shadow-none px-2" size="icon" variant="ghost">
                <X className="h-6 w-6" />
              </Button>
            </SheetClose>
            <MobileSidebarLogo />
          </SheetTitle>
        </SheetHeader>
        <div className="text-muted-foreground space-y-4">
          <div className="space-y-2">
            {SITE_CONFIG.routes.map((route) => (
              <MobileSidebarLink id={route.id} key={route.id} href={route.url}>
                {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
                {t(`Routes.${route.translationKey}`)}
              </MobileSidebarLink>
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
        </div>
      </SheetContent>
    </MobileSidebarContextProvider>
  );
};

export default MobileSidebar;
