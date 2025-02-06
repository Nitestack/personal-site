"use client";

import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { type FC, type ReactNode } from "react";

import { SectionsContextProvider } from "@components/sections/context";

interface ProviderProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}

const Providers: FC<ProviderProps> = ({ children, themeProps }) => {
  return (
    <ThemeProvider {...themeProps}>
      <SectionsContextProvider>{children}</SectionsContextProvider>
    </ThemeProvider>
  );
};

export default Providers;
