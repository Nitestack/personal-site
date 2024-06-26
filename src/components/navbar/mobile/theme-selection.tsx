"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Label } from "@components/ui/label";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";

import type { FC } from "react";

const MobileThemeSelection: FC<{
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
    <div className="px-6">
      <p className="text-center text-xl font-bold tracking-wider">{label}</p>
      <RadioGroup defaultValue={resolvedTheme} onValueChange={setTheme}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="light-radio" value="light" />
          <Label className="text-lg" htmlFor="light-radio">
            {lightLabel}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="dark-radio" value="dark" />
          <Label className="text-lg" htmlFor="dark-radio">
            {darkLabel}
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default MobileThemeSelection;
