import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@components/navbar/client";
import NavbarLink from "@components/navbar/link";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Label } from "@components/ui/label";
import { Switch } from "@components/ui/switch";

import { Settings } from "lucide-react";
import NextImage from "next/image";
import NextLink from "next/link";
import { type FC } from "react";

import Logo from "@assets/logo.png";

const Navbar: FC = () => {
  return (
    <NavigationMenu className="bg-white dark:bg-gray-900 z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
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
        <NavigationMenuList className="hidden md:flex space-x-4">
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
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Switch id="theme-switch" />
                  <Label htmlFor="theme-switch">Dark Mode</Label>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Switch id="language-switch" />
                  <Label htmlFor="language-switch">EN / DE</Label>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </NavigationMenu>
  );
};

export default Navbar;
