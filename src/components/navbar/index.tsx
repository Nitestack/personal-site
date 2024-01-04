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
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

import { Settings } from "lucide-react";
import NextImage from "next/image";
import NextLink from "next/link";
import { type FC } from "react";

import Logo from "@assets/logo.png";

const Navbar: FC = () => {
  return (
    <NavigationMenu className="bg-white dark:bg-gray-900 sticky z-10 top-0 inset-x-0">
      <div className="px-6 py-4 flex justify-between items-center max-w-full">
        <div className="md:hidden"></div>
        <div className="flex items-center gap-2">
          <NextImage alt="Nhan Pham" width={36} height={36} src={Logo} />
          <NextLink
            className="text-xl font-bold text-gray-800 dark:text-white"
            href="/"
          >
            Nhan Pham
          </NextLink>
        </div>
        <NavigationMenuList className="hidden md:flex flex-1 space-x-4 list-none group">
          <NavigationMenuItem>
            <NavbarLink
              className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
              href="/about"
            >
              About
            </NavbarLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavbarLink
              className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
              href="/projects"
            >
              Projects
            </NavbarLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavbarLink
              className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
              href="/contact"
            >
              Contact
            </NavbarLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <ThemeSelection />
              <LanguageSelection />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <NavigationMenuViewport className="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]" />
    </NavigationMenu>
  );
};

export default Navbar;
