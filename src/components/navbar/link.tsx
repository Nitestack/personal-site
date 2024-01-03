"use client";

import {
  NavigationMenuLink,
  type NavigationMenuLinkProps,
} from "@radix-ui/react-navigation-menu";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";

const NavbarLink: FC<NavigationMenuLinkProps & { href: string }> = ({
  href,
  ...props
}) => {
  const pathname = usePathname();
  return (
    <NextLink href={href} passHref legacyBehavior>
      <NavigationMenuLink
        className="NavigationMenuLink"
        active={pathname === href}
        {...props}
      />
    </NextLink>
  );
};

export default NavbarLink;
