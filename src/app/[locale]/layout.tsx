import { defaultMetadata } from "@metadata";

import Providers from "@app/providers";

import Footer from "@components/footer";
import Navbar from "@components/navbar";

import { SpeedInsights } from "@vercel/speed-insights/next";
import pick from "lodash.pick";
import { type Viewport } from "next";
import { useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import { type FC, type ReactNode } from "react";

import { classNames } from "@utils";

import { LOCALIZATION_CONFIG } from "@constants";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const monaspace = localFont({
  src: "../fonts/MonaspaceNeon.woff2",
  variable: "--font-monaspace",
});

export const generateMetadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export function generateStaticParams() {
  return LOCALIZATION_CONFIG.locales.map((locale) => ({ locale }));
}

const LocaleLayout: FC<{ children: ReactNode; params: { locale: string } }> = ({
  children,
  params: { locale },
}) => {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <html
      className={classNames(
        workSans.variable,
        monaspace.variable,
        "antialiased scroll-smooth scroll-pt-16 md:scroll-pt-24 scrollbar-none",
      )}
      lang={locale}
      suppressHydrationWarning
    >
      <head />
      <body className="relative flex min-h-screen flex-col">
        <Providers
          themeProps={{
            attribute: "class",
            enableSystem: true,
            defaultTheme: "system",
            disableTransitionOnChange: true,
          }}
          localeProps={{
            locale,
            messages: pick(messages, "Error"),
          }}
        >
          <Navbar />
          <main className="container mb-8 mx-auto mt-4 w-full flex-grow px-6 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
};

export default LocaleLayout;
