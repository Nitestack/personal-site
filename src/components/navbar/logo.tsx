"use client";

import { MotionA } from "@components/motion";
import { useSectionsContext } from "@components/sections/context";

import { Link } from "@navigation";

import NextImage from "next/image";
import { type FC } from "react";

import { SITE_CONFIG } from "@constants";

import Logo from "@public/images/logo.png";

const NavbarLogo: FC = () => {
  const { setActiveSection } = useSectionsContext();
  function handleOnClick() {
    setActiveSection(null);
  }
  return (
    <Link passHref legacyBehavior href="/">
      <MotionA
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        onClick={handleOnClick}
      >
        <NextImage alt={SITE_CONFIG.name} width={36} height={36} src={Logo} />
        <span className="text-2xl font-bold whitespace-nowrap">
          {SITE_CONFIG.name}
        </span>
      </MotionA>
    </Link>
  );
};

export default NavbarLogo;
