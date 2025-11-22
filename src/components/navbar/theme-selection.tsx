"use client";

import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import type { FC } from "react";

const ThemeSelection: FC<{
  label: string;
  darkLabel: string;
  lightLabel: string;
}> = ({ label, darkLabel, lightLabel }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <DropdownMenuLabel className="text-center">{label}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={resolvedTheme} onValueChange={setTheme}>
        <DropdownMenuRadioItem value="light">
          {lightLabel}
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dark">{darkLabel}</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </>
  );
};

export default ThemeSelection;
