import { defaultMetadata } from "@metadata";
import { classNames } from "@utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Work_Sans } from "next/font/google";
import localFont from "next/font/local";

import { redirect, routing } from "@/i18n/routing";
import Providers from "@app/providers";
import Footer from "@components/footer";
import Navbar from "@components/navbar";
import ScrollProgress from "@components/scroll-progress";
import { Toaster } from "@components/ui/sonner";

import type { FC, ReactNode } from "react";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const commitMono = localFont({
  src: "../fonts/CommitMonoNerdFont.otf",
  variable: "--font-commit-mono",
});

export const generateMetadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const LocaleLayout: FC<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}> = async ({ children, params }) => {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    redirect({ href: "/", locale: "en" });
  }

  setRequestLocale(locale);

  return (
    <html
      className={classNames(
        workSans.variable,
        commitMono.variable,
        "scrollbar-none scroll-smooth antialiased"
      )}
      lang={locale}
      suppressHydrationWarning
    >
      <head />
      <body className="relative flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <Providers
            themeProps={{
              attribute: "class",
              enableSystem: true,
              defaultTheme: "system",
              disableTransitionOnChange: true,
            }}
          >
            <Navbar />
            <main className="container mx-auto mt-4 mb-8 w-full grow px-6 sm:px-6 md:mt-12 lg:px-8">
              {children}
            </main>
            <Footer />
            <Toaster />
            <ScrollProgress />
            <Analytics />
            <SpeedInsights />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
