"use client";

import { MotionLink } from "@/components/motion";
import { useSectionsContext } from "@/components/sections/context";
import { SITE_CONFIG } from "@/constants";
import Logo from "@public/images/logo.png";
import NextImage from "next/image";
import { type FC } from "react";

const NavbarLogo: FC<{ onClick?: () => void }> = ({ onClick }) => {
  const { setActiveSection, setTimeOfLastClick } = useSectionsContext();
  function handleOnClick() {
    setActiveSection(null);
    setTimeOfLastClick(Date.now());
    onClick?.();
  }
  return (
    <MotionLink
      href={{ pathname: "/", hash: "#intro" }}
      className="flex items-center gap-2"
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
      onClick={handleOnClick}
    >
      <NextImage alt={SITE_CONFIG.name} width={36} height={36} src={Logo} />
      <span className="text-2xl font-bold whitespace-nowrap">
        {SITE_CONFIG.name}
      </span>
    </MotionLink>
  );
};

export default NavbarLogo;
