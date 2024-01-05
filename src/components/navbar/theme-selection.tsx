"use client";

import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@components/ui/dropdown-menu";

import { useTheme } from "next-themes";
import { type FC } from "react";

const ThemeSelection: FC<{
  label: string;
  darkLabel: string;
  lightLabel: string;
}> = ({ label, darkLabel, lightLabel }) => {
  const { resolvedTheme, setTheme } = useTheme();
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
