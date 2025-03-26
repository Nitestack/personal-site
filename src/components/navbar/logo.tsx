"use client";

import { SITE_CONFIG } from "@constants";
import NextImage from "next/image";
import { type FC } from "react";

import { Link } from "@/i18n/routing";
import { MotionA } from "@components/motion";
import { useSectionsContext } from "@components/sections/context";
import Logo from "@public/images/logo.png";

const NavbarLogo: FC<{ onClick?: () => void }> = ({ onClick }) => {
  const { setActiveSection, setTimeOfLastClick } = useSectionsContext();
  function handleOnClick() {
    setActiveSection(null);
    setTimeOfLastClick(Date.now());
    onClick?.();
  }
  return (
    <Link passHref legacyBehavior href={{ pathname: "/", hash: "#intro" }}>
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
