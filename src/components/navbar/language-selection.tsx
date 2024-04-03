"use client";

import { LOCALIZATION_CONFIG } from "@constants";
import { usePathname, useRouter } from "@navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@components/ui/dropdown-menu";

import type { FC } from "react";

const LanguageSelection: FC<{ label: string }> = ({ label }) => {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  function onLocaleSelect(newLocale: string) {
    startTransition(() => {
      router.replace(pathname + location.hash, { locale: newLocale });
    });
  }
  return (
    <>
      <DropdownMenuLabel className="text-center">{label}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup
        value={currentLocale}
        onValueChange={onLocaleSelect}
      >
        {LOCALIZATION_CONFIG.locales.map((locale) => (
          <DropdownMenuRadioItem key={locale} value={locale}>
            {LOCALIZATION_CONFIG.localeMap[locale]}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </>
  );
};

export default LanguageSelection;
