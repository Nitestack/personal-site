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
    <NavigationMenu className="sticky z-50 top-0 inset-x-0 md:top-6 mx-auto max-w-screen-md border rounded-none md:rounded-full border-border/40 w-full bg-background/80 shadow-lg shadow-ring/5 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 lg:px-6 py-1 flex justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <MobileSidebar />
          </div>
          <NavbarLogo />
        </div>
        <NavigationMenuList
          asChild
          className="hidden md:flex flex-1 gap-1 list-none group"
        >
          <MotionUl
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            {SITE_CONFIG.routes.map((route) => (
              <NavbarLink id={route.id} key={route.id} href={route.url}>
                {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
                {t(`Routes.${route.translationKey}`)}
              </NavbarLink>
            ))}
          </MotionUl>
        </NavigationMenuList>
        <MotionDiv
          className="md:flex hidden items-center space-x-2"
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
      <NavigationMenuViewport className="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]" />
    </NavigationMenu>
  );
};

export default Navbar;
