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

import NextImage from "next/image";
import NextLink from "next/link";
import { type FC } from "react";

import Logo from "@assets/logo.png";

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

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
                <SettingsIcon className="h-4 w-4" />
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
