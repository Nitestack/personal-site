"use client";

import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@components/ui/dropdown-menu";

import { useTheme } from "next-themes";
import { type FC } from "react";

const ThemeSelection: FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <>
      <DropdownMenuLabel className="text-center">Theme</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={resolvedTheme} onValueChange={setTheme}>
        <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </>
  );
};

export default ThemeSelection;
