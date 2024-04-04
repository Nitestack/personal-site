"use client";

import { type Section } from "@constants";
import { Link } from "@navigation";
import { classNames } from "@utils";
import { type LinkProps } from "next/link";
import { type FC } from "react";

import { MotionSpan } from "@components/motion";
import { useMobileSidebarContext } from "@components/navbar/mobile/context";
import { useSectionsContext } from "@components/sections/context";
import { Button } from "@components/ui/button";

const MobileSidebarLink: FC<{
  id: Section;
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
        "relative z-0 w-full rounded-none border-none text-xl font-bold tracking-wider shadow-none",
        {
          "text-accent-foreground": isActive,
        }
      )}
      variant="outline"
      asChild
    >
      <Link onClick={handleOnClick} href={href}>
        {children}
        {isActive && (
          <MotionSpan
            className="absolute inset-0 -z-10 bg-accent"
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
