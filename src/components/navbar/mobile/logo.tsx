"use client";

import NavbarLogo from "@/components/navbar/logo";
import { useMobileSidebarContext } from "@/components/navbar/mobile/context";

const MobileSidebarLogo = () => {
  const { setOpen } = useMobileSidebarContext();
  function handleOnClick() {
    setOpen(false);
  }
  return <NavbarLogo onClick={handleOnClick} />;
};

export default MobileSidebarLogo;
