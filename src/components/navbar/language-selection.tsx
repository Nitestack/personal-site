"use client";

import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@components/ui/dropdown-menu";

import { type FC } from "react";

const LanguageSelection: FC = () => {
  return (
    <>
      <DropdownMenuLabel>Language</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={"en"} onValueChange={() => void 0}>
        <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="de">Deutsch</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </>
  );
};

export default LanguageSelection;
