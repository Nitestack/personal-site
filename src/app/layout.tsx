import "@app/globals.css";

import { type Metadata } from "next";
import { type FC, type ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Nhan Pham",
    template: "%s | Nhan Pham",
  },
  description: "Personal website",
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return children;
};

export default RootLayout;
