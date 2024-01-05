import Providers from "@app/providers";

import Footer from "@components/footer";
import Navbar from "@components/navbar";

import { SpeedInsights } from "@vercel/speed-insights/next";
import pick from "lodash.pick";
import { type Metadata } from "next";
import { useMessages } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { IBM_Plex_Mono, Work_Sans } from "next/font/google";
import { type FC, type ReactNode } from "react";

import { classNames } from "@utils";

import { LOCALES } from "@constants";

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

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: "Nhan Pham",
    description: t("description"),
  };
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
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
        ibmPlexMono.variable,
        "antialiased",
      )}
      lang={locale}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <Providers
          themeProps={{
            attribute: "class",
            enableSystem: true,
            defaultTheme: "system",
          }}
          localeProps={{
            locale,
            messages: pick(messages, "Error"),
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

export default LocaleLayout;
