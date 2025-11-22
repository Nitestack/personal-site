"use client";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

import { MotionSpan } from "@/components/motion";
import { useSectionsContext } from "@/components/sections/context";
import { type Section } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { type LinkProps } from "next/link";
import { type FC } from "react";

const NavbarLink: FC<{
  id: Section;
  href: LinkProps["href"];
  children: string;
}> = ({ id, href, children }) => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useSectionsContext();
  const isActive = activeSection === id;
  function handleOnClick() {
    setActiveSection(id);
    setTimeOfLastClick(Date.now());
  }
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={cn(navigationMenuTriggerStyle(), {
          "text-accent-foreground": isActive,
        })}
        onClick={handleOnClick}
        active={isActive}
      >
        <Link href={href}>
          {children}
          {isActive && (
            <MotionSpan
              className="bg-accent absolute inset-0 -z-10 rounded-full"
              layoutId="activeSection"
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
            />
          )}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default NavbarLink;
