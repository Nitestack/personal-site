"use client";

import { Button } from "@/components/ui/button";

import { MotionSpan } from "@/components/motion";
import { useMobileSidebarContext } from "@/components/navbar/mobile/context";
import { useSectionsContext } from "@/components/sections/context";
import { type Section } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils";
import { type LinkProps } from "next/link";
import { type FC } from "react";

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
      className={cn(
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
