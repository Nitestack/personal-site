"use client";

import { Sheet } from "@/components/ui/sheet";

import { createContext, useContext, useState } from "react";

import type { Dispatch, FC, ReactNode, SetStateAction } from "react";

const MobileSidebarContext = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export const MobileSidebarContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <MobileSidebarContext.Provider value={{ open, setOpen }}>
      <Sheet open={open} onOpenChange={setOpen}>
        {children}
      </Sheet>
    </MobileSidebarContext.Provider>
  );
};

export function useMobileSidebarContext() {
  const context = useContext(MobileSidebarContext);

  if (context === null) {
    throw new Error(
      "useMobileSidebarContext must be inside of <MobileSidebarContextProvider />"
    );
  }

  return context;
}
