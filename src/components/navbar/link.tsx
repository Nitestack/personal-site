"use client";

import { navigationMenuTriggerStyle } from "@components/ui/navigation-menu";

import { Link, usePathname } from "@navigation";

import {
  NavigationMenuLink,
  type NavigationMenuLinkProps,
} from "@radix-ui/react-navigation-menu";
import { type UrlObject } from "node:url";
import { type FC } from "react";

import { classNames } from "@utils";

const NavbarLink: FC<
  Omit<NavigationMenuLinkProps, "href"> & { href: string | UrlObject }
> = ({ href, className, ...props }) => {
  const pathname = usePathname();
  return (
    <Link href={href} passHref legacyBehavior>
      <NavigationMenuLink
        className={classNames(navigationMenuTriggerStyle(), className)}
        active={pathname === href}
        {...props}
      />
    </Link>
  );
};

export default NavbarLink;
