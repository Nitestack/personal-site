"use client";

import { MotionLink } from "@/components/motion";
import { useSectionsContext } from "@/components/sections/context";

import { type FC } from "react";

import { SITE_CONFIG } from "@/constants";

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
      className="text-2xl font-bold whitespace-nowrap"
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
      onClick={handleOnClick}
    >
      {SITE_CONFIG.name}
    </MotionLink>
  );
};

export default NavbarLogo;
