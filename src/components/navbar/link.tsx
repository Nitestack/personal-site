"use client";

import { navigationMenuTriggerStyle } from "@components/ui/navigation-menu";

import {
  NavigationMenuLink,
  type NavigationMenuLinkProps,
} from "@radix-ui/react-navigation-menu";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";

import { classNames } from "@utils";

const NavbarLink: FC<NavigationMenuLinkProps & { href: string }> = ({
  href,
  className,
  ...props
}) => {
  const pathname = usePathname();
  return (
    <NextLink href={href} passHref legacyBehavior>
      <NavigationMenuLink
        className={classNames(navigationMenuTriggerStyle(), className)}
        active={pathname === href}
        {...props}
      />
    </NextLink>
  );
};

export default NavbarLink;
