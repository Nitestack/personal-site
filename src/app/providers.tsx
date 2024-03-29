"use client";

import { SectionsContextProvider } from "@components/sections/context";

import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { type FC, type ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
  localeProps: {
    locale: string;
    messages?: AbstractIntlMessages;
  };
}

const Providers: FC<ProviderProps> = ({
  children,
  themeProps,
  localeProps,
}) => {
  return (
    <ThemeProvider {...themeProps}>
      <NextIntlClientProvider {...localeProps}>
        <SectionsContextProvider>{children}</SectionsContextProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
