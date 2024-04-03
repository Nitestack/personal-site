"use client";

import { type Section } from "@constants";
import { Link } from "@navigation";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { classNames } from "@utils";
import { type LinkProps } from "next/link";
import { type FC } from "react";

import { MotionSpan } from "@components/motion";
import { useSectionsContext } from "@components/sections/context";
import { navigationMenuTriggerStyle } from "@components/ui/navigation-menu";

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
      <Link href={href} passHref legacyBehavior>
        <NavigationMenuLink
          className={classNames(navigationMenuTriggerStyle(), {
            "text-accent-foreground": isActive,
          })}
          onClick={handleOnClick}
          active={isActive}
        >
          {children}
          {isActive && (
            <MotionSpan
              className="bg-accent rounded-full absolute inset-0 -z-10"
              layoutId="activeSection"
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
            />
          )}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default NavbarLink;
