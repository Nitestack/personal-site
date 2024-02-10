"use client";

import { MotionSpan } from "@components/motion";
import { useMobileSidebarContext } from "@components/navbar/mobile/context";
import { useSectionsContext } from "@components/sections/context";
import { Button } from "@components/ui/button";

import { Link } from "@navigation";

import { type LinkProps } from "next/link";
import { type FC } from "react";

import { classNames } from "@utils";

const MobileSidebarLink: FC<{
  id: string;
  children: string;
  href: LinkProps["href"];
}> = ({ id, children, href }) => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useSectionsContext();
  const { setOpen } = useMobileSidebarContext();
  const isActive = activeSection === id;
  function handleOnClick() {
    setActiveSection(id);
    setTimeOfLastClick(Date.now());
    setOpen(false);
  }
  return (
    <Button
      className={classNames(
        "relative z-0 w-full text-xl tracking-wider font-bold shadow-none border-none rounded-none",
        {
          "text-accent-foreground": isActive,
        },
      )}
      variant="outline"
      asChild
    >
      <Link onClick={handleOnClick} href={href}>
        {children}
        {isActive && (
          <MotionSpan
            className="bg-accent absolute inset-0 -z-10"
            layoutId="activeMobileSection"
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
            }}
          />
        )}
      </Link>
    </Button>
  );
};

export default MobileSidebarLink;
