import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuViewport,
} from "@components/navbar/client";
import LanguageSelection from "@components/navbar/language-selection";
import NavbarLink from "@components/navbar/link";
import ThemeSelection from "@components/navbar/theme-selection";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

import { Link } from "@navigation";

import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { type FC } from "react";

import { SITE_CONFIG } from "@constants";

import Logo from "@assets/logo.png";

const Navbar: FC = () => {
  const t = useTranslations();
  return (
    <NavigationMenu className="border-b border-border/40 sticky z-10 top-0 inset-x-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-6 py-4 flex justify-between items-center max-w-screen-2xl">
        <div className="md:hidden"></div>
        <div className="flex items-center gap-2">
          <NextImage alt={SITE_CONFIG.name} width={36} height={36} src={Logo} />
          <Link className="text-2xl font-bold" href="/">
            {SITE_CONFIG.name}
          </Link>
        </div>
        <NavigationMenuList className="hidden md:flex flex-1 space-x-4 list-none group">
          {SITE_CONFIG.routes.map((route) => (
            <NavigationMenuItem key={route.href}>
              <NavbarLink href={route.href}>
                {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
                {t(`Routes.${route.translationKey}`)}
              </NavbarLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
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
        </div>
      </div>
      <NavigationMenuViewport className="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]" />
    </NavigationMenu>
  );
};

export default Navbar;
