import "@app/globals.css";
import "highlight.js/styles/github-dark-dimmed.css";

import { type FC, type ReactNode } from "react";

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return children;
};

export default RootLayout;
