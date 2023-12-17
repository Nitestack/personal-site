"use client";

import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { type FC, type ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}

const Providers: FC<ProviderProps> = ({ children, themeProps }) => {
  return <ThemeProvider {...themeProps}>{children}</ThemeProvider>;
};

export default Providers;
