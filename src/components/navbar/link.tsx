"use client";

import { MotionDiv } from "@components/motion";
import { useSectionsContext } from "@components/sections/context";
import { navigationMenuTriggerStyle } from "@components/ui/navigation-menu";

import { Link } from "@navigation";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  type NavigationMenuLinkProps,
} from "@radix-ui/react-navigation-menu";
import { type UrlObject } from "node:url";
import { type FC } from "react";

import { classNames } from "@utils";

const NavbarLink: FC<
  Omit<NavigationMenuLinkProps, "href"> & {
    href: string | UrlObject;
    id: string;
  }
> = ({ id, href, className, children, ...props }) => {
  const { activeSection, setActiveSection } = useSectionsContext();
  const isActive = activeSection === id;
  function handleOnClick() {
    setActiveSection(id);
  }
  return (
    <NavigationMenuItem>
      <Link href={href} passHref legacyBehavior>
        <NavigationMenuLink
          className={classNames(navigationMenuTriggerStyle(), className)}
          onClick={handleOnClick}
          active={isActive}
          {...props}
        >
          {children}
          {isActive && (
            <MotionDiv
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
