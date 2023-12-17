import "@app/globals.css";
import Providers from "@app/providers";

import Footer from "@components/footer";
import Navbar from "@components/navbar";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { IBM_Plex_Mono, Work_Sans } from "next/font/google";
import { type FC, type ReactNode } from "react";

import { classNames } from "@utils";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-work-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Nhan Pham",
    template: "%s | Nhan Pham",
  },
  description: "Personal website",
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html
      className={classNames(
        workSans.variable,
        ibmPlexMono.variable,
        "antialiased",
      )}
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <Providers
          themeProps={{
            attribute: "class",
            enableSystem: true,
            defaultTheme: "system",
          }}
        >
          <Navbar />
          <main className="mx-auto mt-4 w-full flex-grow px-3 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
