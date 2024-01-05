"use client";

import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@components/ui/dropdown-menu";

import { usePathname, useRouter } from "@navigation";

import { useLocale } from "next-intl";
import { type FC, useTransition } from "react";

import { LOCALES, LOCALE_MAP } from "@constants";

const LanguageSelection: FC<{ label: string }> = ({ label }) => {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  function onLocaleSelect(newLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
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
        {LOCALES.map((locale) => (
          <DropdownMenuRadioItem key={locale} value={locale}>
            {LOCALE_MAP[locale]}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </>
  );
};

export default LanguageSelection;
