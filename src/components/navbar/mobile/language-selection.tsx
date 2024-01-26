"use client";

import { Label } from "@components/ui/label";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";

import { usePathname, useRouter } from "@navigation";

import { useLocale } from "next-intl";
import { type FC, useTransition } from "react";

import { LOCALIZATION_CONFIG } from "@constants";

const MobileLanguageSelection: FC<{ label: string }> = ({ label }) => {
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
    <div className="px-6">
      <p className="text-center font-bold tracking-wider text-xl">{label}</p>
      <RadioGroup defaultValue={currentLocale} onValueChange={onLocaleSelect}>
        {LOCALIZATION_CONFIG.locales.map((locale) => (
          <div className="flex items-center space-x-2" key={locale}>
            <RadioGroupItem id={locale + "-radio"} value={locale} />
            <Label className="text-lg" htmlFor={locale + "-radio"}>
              {LOCALIZATION_CONFIG.localeMap[locale]}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default MobileLanguageSelection;
