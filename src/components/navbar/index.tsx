import { SITE_CONFIG } from "@constants";
import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { type FC } from "react";

import { MotionDiv, MotionUl } from "@components/motion";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuViewport,
} from "@components/navbar/client";
import LanguageSelection from "@components/navbar/language-selection";
import NavbarLink from "@components/navbar/link";
import NavbarLogo from "@components/navbar/logo";
import MobileSidebar from "@components/navbar/mobile";
import ThemeSelection from "@components/navbar/theme-selection";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

const Navbar: FC = () => {
  const t = useTranslations();
  return (
    <NavigationMenu className="border-border/40 bg-background/80 shadow-ring/5 supports-backdrop-filter:bg-background/60 sticky inset-x-0 top-0 z-50 mx-auto w-full max-w-(--breakpoint-md) rounded-none border shadow-lg backdrop-blur-sm md:top-6 md:rounded-full">
      <div className="flex items-center justify-between gap-8 px-4 py-1 lg:px-6">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <MobileSidebar />
          </div>
          <NavbarLogo />
        </div>
        <NavigationMenuList
          asChild
          className="group hidden flex-1 list-none gap-1 md:flex"
        >
          <MotionUl
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            {SITE_CONFIG.routes.map((route) => (
              <NavbarLink id={route.id} key={route.id} href={route.url}>
                {t(`Routes.${route.translationKey}`)}
              </NavbarLink>
            ))}
          </MotionUl>
        </NavigationMenuList>
        <MotionDiv
          className="hidden items-center space-x-2 md:flex"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <ThemeSelection
                label={t("Settings.Theme.name")}
                darkLabel={t("Settings.Theme.dark")}
                lightLabel={t("Settings.Theme.light")}
              />
              <DropdownMenuSeparator />
              <LanguageSelection label={t("Settings.language")} />
            </DropdownMenuContent>
          </DropdownMenu>
        </MotionDiv>
      </div>
      <NavigationMenuViewport className="origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]" />
    </NavigationMenu>
  );
};

export default Navbar;
